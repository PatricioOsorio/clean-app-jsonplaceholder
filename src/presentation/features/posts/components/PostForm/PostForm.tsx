import { Input } from 'lib-styleguide-simba/shadcn/input';
import { Textarea } from 'lib-styleguide-simba/shadcn/textarea';
import { Label } from 'lib-styleguide-simba/shadcn/label';
import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import { StatusContent } from '@presentation/shared/components';
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
  errors,
  status = {},
}: IPostFormProps) => (
  <form
    noValidate
    {...rootProps}
    className={cn('post-form-container', rootProps?.className)}
    onSubmit={onSubmit}
  >
    <StatusContent {...status} loadingTemplate={status.loadingTemplate ?? <PostFormSkeleton />}>
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
    </StatusContent>
  </form>
);

PostForm.Skeleton = PostFormSkeleton;
