import type { Schema, Attribute } from '@strapi/strapi';

export interface QuestionsOption extends Schema.Component {
  collectionName: 'components_questions_options';
  info: {
    displayName: 'Option';
    icon: 'question';
  };
  attributes: {
    text: Attribute.String;
    correct: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'questions.option': QuestionsOption;
    }
  }
}
