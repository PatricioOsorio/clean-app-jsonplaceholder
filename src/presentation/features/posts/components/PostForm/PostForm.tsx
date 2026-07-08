import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import { StatusContent } from '@presentation/shared/components';
import type { IPostFormProps } from './PostForm.interfaces';

import { PostFormSkeleton } from './Skeleton/Skeleton';
import './PostForm.css';

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
        <Button type="button" variant="ghost" {...btnCancelProps} />
        <Button type="button" {...btnOkProps} />
      </div>
    </StatusContent>
  </form>
);

PostForm.Skeleton = PostFormSkeleton;
