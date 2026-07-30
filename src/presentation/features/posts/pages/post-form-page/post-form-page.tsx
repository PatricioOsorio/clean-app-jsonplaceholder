import { PostForm } from '../../components/post-form';
import { usePostFormPage } from './use-post-form-page';

import './post-form-page.css';

export const PostFormPage = () => {
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
  } = usePostFormPage();

  return (
    <section className="post-form-page">
      <header className="pfp__header">
        <p className="pfp__system-tag">Post editor</p>
        <h1 className="pfp__title">{TITLE}</h1>
        <p className="pfp__subtitle">{SUBTITLE}</p>
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
