import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';
import { StatusContent } from 'lib-styleguide-simba/status-content';

import type { IPostFormProps } from './post-form.interfaces';
import { PostFormSkeleton } from './skeleton/skeleton';
import './post-form.css';

export const PostForm = ({
  Input,
  btnCancelProps,
  btnOkProps,
  rootProps,
  status = {},
}: IPostFormProps) => (
  <form {...rootProps} className={cn('post-form-container', rootProps?.className)}>
    <StatusContent {...status} loadingTemplate={<PostFormSkeleton />}>
      <Input.Title />
      <Input.Content />

      <div className="pfc__actions">
        <Button type="button" variant="text" {...btnCancelProps} />
        <Button type="button" {...btnOkProps} />
      </div>
    </StatusContent>
  </form>
);

PostForm.Skeleton = PostFormSkeleton;
