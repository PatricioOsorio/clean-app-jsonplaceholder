import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from 'styleguide/input';
import { Textarea } from 'styleguide/textarea';
import { Label } from 'styleguide/label';
import { Button } from 'styleguide/Button';

import { useCreatePost } from '../../hooks';
import './PostCreatePage.css';

const CONTENT_MAX = 500;

export const PostCreatePage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreatePost();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    mutate({ title: title.trim(), content: content.trim(), idUser: 1 });
    navigate('/posts');
  };

  return (
    <section className="post-create-page-container">
      <header className="pcpc__header">
        <p className="pcpc__system-tag">[ System // Action // Compose ]</p>
        <h1 className="pcpc__title">NEW POST</h1>
        <p className="pcpc__subtitle">
          Write a new entry. Saved through Clean Architecture Use Cases with an optimistic update.
        </p>
      </header>

      <form noValidate className="pcpc__form" onSubmit={handleSubmit}>
        <div className="pcpc__field">
          <Label className="pcpc__label" htmlFor="title">
            Title
          </Label>
          <Input
            autoFocus
            id="title"
            name="title"
            placeholder="A short, descriptive title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="pcpc__field">
          <div className="pcpc__label-row">
            <Label className="pcpc__label" htmlFor="content">
              Content
            </Label>
            <span className="pcpc__counter">
              {content.length}/{CONTENT_MAX}
            </span>
          </div>
          <Textarea
            id="content"
            maxLength={CONTENT_MAX}
            name="content"
            placeholder="Write the body of your post…"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="pcpc__actions">
          <Button
            disabled={isPending}
            type="button"
            variant="ghost"
            onClick={() => navigate('/posts')}
          >
            Cancel
          </Button>
          <Button disabled={!isValid || isPending} type="submit">
            {isPending ? 'Saving…' : 'Publish post'}
          </Button>
        </div>
      </form>
    </section>
  );
};
