import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { ICommentVM } from '../../models';

export interface ICommentProps extends IWithRootProps<'div'> {
  comment: ICommentVM;
}
