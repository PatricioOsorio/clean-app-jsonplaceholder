import { Input } from 'styleguide/input';
import { Textarea } from 'styleguide/textarea';
import { Label } from 'styleguide/label';
import { Button } from 'styleguide/button';
import { cn } from 'styleguide/utils';

import type { IPostFormProps } from './PostForm.interfaces';

import { PostFormSkeleton } from './Skeleton/Skeleton';
import './PostForm.css';

const CONTENT_MAX = 500;

export const PostForm = ({
  title,
  content,
  onSubmit,
  onTitleChange,
  onContentChange,
  btnCancelProps,
  btnOkProps,
  rootProps,
  isLoading,
}: IPostFormProps) => {
  if (isLoading) return <PostFormSkeleton />;

  return (
    <form
      noValidate
      {...rootProps}
      className={cn('post-form-container', rootProps?.className)}
      onSubmit={onSubmit}
    >
      <div className="pfc__field">
        <Label className="pfc__label" htmlFor="title">
          Title
        </Label>
        <Input
          autoFocus
          id="title"
          name="title"
          placeholder="A short, descriptive title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="pfc__field">
        <div className="pfc__label-row">
          <Label className="pfc__label" htmlFor="content">
            Content
          </Label>
          <span className="pfc__counter">
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
          onChange={(e) => onContentChange(e.target.value)}
        />
      </div>

      <div className="pfc__actions">
        <Button type="button" variant="ghost" {...btnCancelProps} />
        <Button type="submit" {...btnOkProps} />
      </div>
    </form>
  );
};

PostForm.Skeleton = PostFormSkeleton;
