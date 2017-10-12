import { BaseEntity } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public creationDate?: any,
        public postComments?: BaseEntity,
    ) {
    }
}
