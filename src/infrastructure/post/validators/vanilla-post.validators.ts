import { injectable } from 'tsyringe';

import { PostInvalidDataError } from '@domain/post/errors';
import type { IValidatorEntity, IValidationIssue } from '@domain/shared/validator.entity';
import { CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';

@injectable()
export class VanillaCreatePostValidator implements IValidatorEntity<CreatePostDto> {
  validate(input: unknown): CreatePostDto {
    const raw = (input || {}) as Partial<CreatePostDto>;

    const idUser = Number(raw.idUser ?? 0);
    const title = (raw.title ?? '').trim();
    const content = (raw.content ?? '').trim();

    const issues: IValidationIssue[] = [];
    if (!idUser || isNaN(idUser)) issues.push({ field: 'idUser', message: 'Must be a valid user ID' });
    if (!title) issues.push({ field: 'title', message: 'Title is required' });
    if (!content) issues.push({ field: 'content', message: 'Content is required' });

    if (issues.length > 0) {
      throw new PostInvalidDataError(issues.map((i) => `${i.field}: ${i.message}`).join(', '), issues);
    }

    return CreatePostDto.create({ idUser, title, content });
  }
}

@injectable()
export class VanillaUpdatePostValidator implements IValidatorEntity<UpdatePostDto> {
  validate(input: unknown): UpdatePostDto {
    const raw = (input || {}) as Partial<UpdatePostDto>;

    const idUser = Number(raw.idUser ?? 0);
    const title = (raw.title ?? '').trim();
    const content = (raw.content ?? '').trim();

    const issues: IValidationIssue[] = [];
    if (!idUser || isNaN(idUser)) issues.push({ field: 'idUser', message: 'Must be a valid user ID' });
    if (!title) issues.push({ field: 'title', message: 'Title is required and cannot be empty' });
    if (!content) issues.push({ field: 'content', message: 'Content is required and cannot be empty' });

    if (issues.length > 0) {
      throw new PostInvalidDataError(issues.map((i) => `${i.field}: ${i.message}`).join(', '), issues);
    }

    return UpdatePostDto.create({ idUser, title, content });
  }
}

@injectable()
export class VanillaPatchPostValidator implements IValidatorEntity<PatchPostDto> {
  validate(input: unknown): PatchPostDto {
    const raw = (input || {}) as Partial<PatchPostDto>;

    const issues: IValidationIssue[] = [];
    let idUser: number | undefined;
    let title: string | undefined;
    let content: string | undefined;

    if (raw.idUser !== undefined) {
      idUser = Number(raw.idUser);
      if (isNaN(idUser)) issues.push({ field: 'idUser', message: 'Must be a valid user ID' });
    }
    if (raw.title !== undefined) {
      title = String(raw.title).trim();
      if (!title) issues.push({ field: 'title', message: 'Title cannot be empty' });
    }
    if (raw.content !== undefined) {
      content = String(raw.content).trim();
      if (!content) issues.push({ field: 'content', message: 'Content cannot be empty' });
    }

    if (idUser === undefined && title === undefined && content === undefined) {
      issues.push({ field: 'general', message: 'At least one field is required' });
    }

    if (issues.length > 0) {
      throw new PostInvalidDataError(issues.map((i) => `${i.field}: ${i.message}`).join(', '), issues);
    }

    return PatchPostDto.create({ idUser, title, content });
  }
}
