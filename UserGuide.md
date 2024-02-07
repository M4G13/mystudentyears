# Strapi User Guide

Strapi is a content management system, that means it's used to publish data to the app, and to keep track of the data which comes from the users of the app.  General information about how strapi works can be found at the [official strapi user guide](https://docs.strapi.io/user-docs/intro), but below we've included specific instructions for our use-case.

## The strapi content manager

The content manager is your primary interface with the app, you can create all the data you need from this screen.  Navigate to it via the sidebar on the left of the page.

### Collection types.

Collection types are the most common type of data in the app, they control the core content which is displayed to the end-user as well as analytics data which is returned to you.  The collection types are as follows:

* AppUser—the _real_ users of the app, students who sign up to the app will appear in here.  You should not manually create any AppUsers but can view information about individual users as well as aggregate information via a download (more info on this later).
* Information—information pages which are displayed before quizzes.  There can be any number of information pages per user and any number can be viewed sequentially.  Information on how to link these provided in the common workflows section.
* Quiz—a collection of question objects for the quiz, these along with information pages are linked together to form a category (which itself is part of a student story).
* School—an auto-generated list of current high-schools in Scotland taken from a government source.  Those data can be found [here](https://spatialdata.gov.scot/geonetwork/srv/api/records/5fa510db-88c8-40ef-bbf2-2989210b7167) for more information.  As with AppUser, these should not generally be added manually though if required they can be.
* Student Story—student stories are the highest-level collection type, they comprise of a number of categories (e.g., finance, academics), which themselves contain a list of information pages and quizzes.
* Survey Questions—the list of questions for users to answer upon opening the app and upon completion of all student stories.  The results for these will be stored in AppUser.

## Common workflows

### Creating a new student story

In this scenario we'll imagine creating a new student story for a character called Molly.  The steps are:
* Navigate to the Content Manager panel (using the sidebar on the left).

* Navigate to the 'Information' panel and press 'Create new entry', This will create the information pages for the first quiz (NB: more than one information page can follow each other for a single quiz).
    * In the title section put the title of this information page (e.g., Molly's first day at uni).
    * Add any accompanying images (these will show up at the top of the information page for some added visual interest).
    * Fill in the text field, this is the main body of a single information page (before a quiz).  Simple formatting can be done, such as italics, bold, etc.
    * NB: Fill in the description field.  The description field is just for you to organise your pages.  Call it something like: 'Molly Finance 1'.
    * Repeat for as many information pages are required for a single quiz (e.g., 'Molly Finance 2', etc.)
    * Press Save
* Create the quiz for the first category (navigate to quiz, and press 'Create new entry').
    * As before, remember to fill in the description field for your own organisation.  Call this something like 'Molly Finance Quiz', so you know the student story and the category it relates to.
    * To add a question to the quiz press the 'Add a component to questions' button.
    * When you do this you'll see 4 options for question types, we'll walk through adding one of each.
    * Select 'multi-choice-question'
        * The question field is the prompt to the user which will appear at the top of the screen for the question, for instance: 'What is the SAAS loan for Household income above £34,000?'
        * Press the 'add new entry' button below the options text, repeat this four times filling in the text '£4000', '£5000', '£6000', '£7000', remember to select 'True' for the correct option ('£6000').
        * As with the information pages, you can add an image here optionally (NB: this is only available for some question types).
    * Next, select 'Add a component to questions' again and pick 'missing-words-question'
        * This is a much simpler question type.  Simply enter a sentence and place square brackets ('[' and ']') around words which should be blanked-out.  The user will then have to put the words back in the correct order.
        * Enter something like: '[Arranged] overdraft is an agreed-upon amount with the bank which allows you to [borrow] in your [current] account.  With most [student] accounts, there won't be any [interest] charges on this, until you stop being a student.'
    * Next, select 'Add a component to questions' again and pick 'rank-order-question'
        * Here, as in multi-choice-question, you'll fill in a prompt at the top (under the field question) for instance: 'Rank the following in terms of common cost (most expensive at the top).'
        * Then add each option in the correct order (they'll be shuffled before they're shown to the user), e.g., 'Accommodation', 'Food & Groceries', 'Textbooks & Education', 'Transport', 'Education & Leisure'.
    * Again, select 'Add a component to questions', and pick 'open-response-question'.
        * As before, fill in the question field.  This question type requires an exact answer so make sure the question isn't too ambiguous and the answers can be short.
        * In this example it could be: 'What is the SCQF level for a Higher National Diploma (HND)', and the answer would be '8'.
    * Press Save
    * Some things to bear in mind:
        * Quizzes can have any number of questions and don't need to use all the question types.
        * Try to keep the multi-choice and rank-order question options short (so they easily fit on the screen).
        * Try to keep the open response questions unambiguous and simple, otherwise users will be frustrated.
* Click on the Student Story tab, and press the 'Create new entry' button.
    * In the 'Name' field type 'Molly'.
    * Next, select the plus button under category (or the '+ Add an entry' button for following categories).
    * From the drop-down select the correct category (in this case 'Finance').  
    * Under information select the information pages for this category, i.e., 'Molly Finance 1', and 'Molly Finance 2'. This is the reason for good descriptions on Information pages and quizzes. (NB: information pages will be displayed in the order you place them in here).
    * Repeat the above for the quiz (e.g., 'Molly Finance Quiz').
