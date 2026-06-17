import { injectable } from 'tsyringe';

import { PostInvalidDataError } from '@domain/post/errors';
import type { IValidatorEntity, IValidationIssue } from '@domain/shared/validator.entity';
import type { ICreatePostInput, IPatchPostInput, IUpdatePostInput } from '@domain/post';

@injectable()
export class VanillaCreatePostValidator implements IValidatorEntity<ICreatePostInput> {
  validate(input: unknown): ICreatePostInput {
    const raw = (input || {}) as Partial<ICreatePostInput>;

    // Normalize
    const data: ICreatePostInput = {
      idUser: Number(raw.idUser ?? 0),
      title: (raw.title ?? '').trim(),
      content: (raw.content ?? '').trim(),
    };

    // Validate
    const issues: IValidationIssue[] = [];
    if (!data.idUser || isNaN(data.idUser)) {
      issues.push({ field: 'idUser', message: 'Must be a valid user ID' });
    }
    if (!data.title) {
      issues.push({ field: 'title', message: 'Title is required' });
    }
    if (!data.content) {
      issues.push({ field: 'content', message: 'Content is required' });
    }

    if (issues.length > 0) {
      const message = issues.map((i) => `${i.field}: ${i.message}`).join(', ');
      throw new PostInvalidDataError(message, issues);
    }

    return data;
  }
}

@injectable()
export class VanillaUpdatePostValidator implements IValidatorEntity<IUpdatePostInput> {
  validate(input: unknown): IUpdatePostInput {
    const raw = (input || {}) as Partial<IUpdatePostInput>;

    // Normalize
    const data: IUpdatePostInput = {
      idUser: Number(raw.idUser ?? 0),
      title: (raw.title ?? '').trim(),
      content: (raw.content ?? '').trim(),
    };

    // Validate
    const issues: IValidationIssue[] = [];
    if (!data.idUser || isNaN(data.idUser)) {
      issues.push({ field: 'idUser', message: 'Must be a valid user ID' });
    }
    if (!data.title) {
      issues.push({ field: 'title', message: 'Title is required and cannot be empty' });
    }
    if (!data.content) {
      issues.push({ field: 'content', message: 'Content is required and cannot be empty' });
    }

    if (issues.length > 0) {
      const message = issues.map((i) => `${i.field}: ${i.message}`).join(', ');
      throw new PostInvalidDataError(message, issues);
    }

    return data;
  }
}

@injectable()
export class VanillaPatchPostValidator implements IValidatorEntity<IPatchPostInput> {
  validate(input: unknown): IPatchPostInput {
    const raw = (input || {}) as Partial<IPatchPostInput>;

    // Normalize and Validate
    const data: IPatchPostInput = {};
    const issues: IValidationIssue[] = [];

    if (raw.idUser !== undefined) {
      data.idUser = Number(raw.idUser);
      if (isNaN(data.idUser)) {
        issues.push({ field: 'idUser', message: 'Must be a valid user ID' });
      }
    }

    if (raw.title !== undefined) {
      data.title = String(raw.title).trim();
      if (!data.title) {
        issues.push({ field: 'title', message: 'Title cannot be empty' });
      }
    }

    if (raw.content !== undefined) {
      data.content = String(raw.content).trim();
      if (!data.content) {
        issues.push({ field: 'content', message: 'Content cannot be empty' });
      }
    }

    const hasKeys = Object.keys(data).length > 0;
    if (!hasKeys) {
      issues.push({ field: 'general', message: 'At least one field is required' });
    }

    if (issues.length > 0) {
      const message = issues.map((i) => `${i.field}: ${i.message}`).join(', ');
      throw new PostInvalidDataError(message, issues);
    }

    return data;
  }
}
