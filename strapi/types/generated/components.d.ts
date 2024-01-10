import type { Schema, Attribute } from '@strapi/strapi';

export interface AnswersAnswers extends Schema.Component {
  collectionName: 'components_answers_answers';
  info: {
    displayName: 'answers';
  };
  attributes: {
    answer: Attribute.String;
  };
}

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

export interface ConfidenceConfidence extends Schema.Component {
  collectionName: 'components_confidence_confidences';
  info: {
    displayName: 'confidence';
    description: '';
  };
  attributes: {
    category: Attribute.Enumeration<
      ['Finance', 'Wellbeing', 'Academics', 'Independence']
    >;
    confidence: Attribute.Enumeration<
      [
        'Fully confident',
        'Quite confident',
        'Not very confident',
        'Not at all confident'
      ]
    >;
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

export interface QuestionsMissingWordsQuestion extends Schema.Component {
  collectionName: 'components_questions_missing_words_questions';
  info: {
    displayName: 'missing-words-question';
    description: '';
  };
  attributes: {
    question: Attribute.Text;
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
    question: Attribute.String;
    options: Attribute.Component<'option-types.multi-choice-option', true> &
      Attribute.SetMinMax<{
        min: 4;
        max: 4;
      }>;
  };
}

export interface QuestionsOpenResponseQuestion extends Schema.Component {
  collectionName: 'components_questions_open_response_questions';
  info: {
    displayName: 'open-response-question';
    description: '';
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.String;
  };
}

export interface QuestionsRankOrderQuestion extends Schema.Component {
  collectionName: 'components_questions_rank_order_questions';
  info: {
    displayName: 'rank-order-question';
    description: '';
  };
  attributes: {
    question: Attribute.String;
    answers: Attribute.Component<'answers.answers', true> &
      Attribute.SetMinMax<{
        min: 3;
        max: 5;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'answers.answers': AnswersAnswers;
      'category.category': CategoryCategory;
      'confidence.confidence': ConfidenceConfidence;
      'option-types.multi-choice-option': OptionTypesMultiChoiceOption;
      'questions.missing-words-question': QuestionsMissingWordsQuestion;
      'questions.multi-choice-question': QuestionsMultiChoiceQuestion;
      'questions.open-response-question': QuestionsOpenResponseQuestion;
      'questions.rank-order-question': QuestionsRankOrderQuestion;
    }
  }
}
