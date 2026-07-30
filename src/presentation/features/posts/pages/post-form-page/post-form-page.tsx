import { PostForm } from '../../components/post-form';
import { usePostPage } from './use-post-page';

import './post-page.css';

export const PostPage = () => {
  const {
    // props
    isLoadingForm,
    btnCancelProps,
    btnOkProps,

    // form
    Input,

    // computed
    TITLE,
    SUBTITLE,
  } = usePostPage();

  return (
    <section className="post-page">
      <header className="pp__header">
        <p className="pp__system-tag">Post editor</p>
        <h1 className="pp__title">{TITLE}</h1>
        <p className="pp__subtitle">{SUBTITLE}</p>
      </header>

      <PostForm
        Input={Input}
        btnCancelProps={btnCancelProps}
        btnOkProps={btnOkProps}
        status={{ isLoading: isLoadingForm }}
      />
    </section>
  );
};
