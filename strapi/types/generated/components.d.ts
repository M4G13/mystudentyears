import type { Schema, Attribute } from '@strapi/strapi';

export interface CategoryCategory extends Schema.Component {
  collectionName: 'components_category_categories';
  info: {
    displayName: 'Category';
    icon: 'grid';
  };
  attributes: {
    Category: Attribute.Enumeration<
      ['Finance', 'Wellbeing', 'Academics', 'Independence']
    >;
    information: Attribute.Relation<
      'category.category',
      'oneToMany',
      'api::info.info'
    >;
    quiz: Attribute.Relation<'category.category', 'oneToOne', 'api::quiz.quiz'>;
  };
}

export interface OptionTypesMultiChoiceOption extends Schema.Component {
  collectionName: 'components_option_types_multi_choice_options';
  info: {
    displayName: 'multi-choice-option';
    icon: 'layer';
  };
  attributes: {
    text: Attribute.String;
    correct: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface QuestionsMultiChoiceQuestion extends Schema.Component {
  collectionName: 'components_questions_multi_choice_questions';
  info: {
    displayName: 'multi-choice-question';
    icon: 'layer';
    description: '';
  };
  attributes: {
    option1: Attribute.Component<'option-types.multi-choice-option'>;
    option2: Attribute.Component<'option-types.multi-choice-option'>;
    option3: Attribute.Component<'option-types.multi-choice-option'>;
    option4: Attribute.Component<'option-types.multi-choice-option'>;
    question: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'category.category': CategoryCategory;
      'option-types.multi-choice-option': OptionTypesMultiChoiceOption;
      'questions.multi-choice-question': QuestionsMultiChoiceQuestion;
    }
  }
}
