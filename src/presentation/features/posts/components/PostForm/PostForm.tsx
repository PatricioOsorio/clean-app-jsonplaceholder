import { Input } from 'styleguide/input';
import { Textarea } from 'styleguide/textarea';
import { Label } from 'styleguide/label';
import { Button } from 'styleguide/button';
import { cn } from 'styleguide/utils';

import { Error } from '@presentation/shared/components';
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
  loadingTemplate,
  isError,
  errors,
  errorTemplate,
  errorTitle,
  errorDescription,
}: IPostFormProps) => {
  const renderContent = () => {
    if (isLoading) {
      return loadingTemplate ?? <PostFormSkeleton />;
    }

    if (isError) {
      return errorTemplate ?? <Error description={errorDescription} title={errorTitle} />;
    }

    return (
      <>
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
          {errors?.title && <span className="mt-1 text-xs text-red-500">{errors.title}</span>}
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
          {errors?.content && <span className="mt-1 text-xs text-red-500">{errors.content}</span>}
        </div>

        <div className="pfc__actions">
          <Button type="button" variant="ghost" {...btnCancelProps} />
          <Button type="submit" {...btnOkProps} />
        </div>
      </>
    );
  };

  return (
    <form
      noValidate
      {...rootProps}
      className={cn('post-form-container', rootProps?.className)}
      onSubmit={onSubmit}
    >
      {renderContent()}
    </form>
  );
};

PostForm.Skeleton = PostFormSkeleton;
