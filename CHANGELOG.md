---
title: 8.0.0
tags: Changelog
---

## [8.0.4] (2024-05-03)

### @axelor/aos-mobile-core

#### Fixes

- Login: improve inputs display on small screens
- PasswordInput: reverse password icon order

### @axelor/aos-mobile-ui

#### Fixes

- Picker: add indicator when no data
- RadioSelect: add readonly parameter with default value to false
- Switch: add readonly parameter with default value to false

### @axelor/aos-mobile-hr

#### Fixes

- Expense line form: add missing readonly & required parameters on components
- Timers: correct order in list view
- Project tasks: modify filters on timesheet lines and timers

### @axelor/aos-mobile-crm

#### Fixes

- Opportunity details screen: modify the width of the informations dropdown

### @axelor/aos-mobile-stock

#### Fixes

- Supplier arrival: adjust style of supplier catalog
- Customer Delivery: restore navigation on search lines view

## [8.0.3] (2024-04-22)

### @axelor/aos-mobile-core

#### Fixes

- Drawer: display of the menu list

## [8.0.2] (2024-04-19)

### @axelor/aos-mobile-core

#### Fixes

- SearchBars: avoid error when no onChange function is provided
- Form inputs: remove space on top when there is no title
- Drawer: add scroll on modules and menus list
- Header: compute height to fill in the ui config value

### @axelor/aos-mobile-ui

#### Features

- Dashboard: add last update date information
- LabelText: add the possibility to define text size

#### Fixes

- NumberChevronInput: enable limit with more than one digit
- NumberChevronInput: format default value when it changes
- SearchBars: avoid error when no onChange function is provided
- DropdownCard: make the width adjustable to the content
- Form inputs: remove space on top when there is no title
- BootstrapIcon: define default color to avoid invisible question mark on dark mode

### @axelor/aos-mobile-hr

#### Fixes

- Form views: avoid error when user does not have an employee

### @axelor/aos-mobile-crm

#### Fixes

- Event: form view take a long time to load

### @axelor/aos-mobile-stock

#### Features

- Internal move creation: add possibility to modify quantity of a line

#### Fixes

- Line views: add default header actions (attached files, tracker and custom fields)

## [8.0.1] (2024-03-13)

This version restore the iOS build which was broken due to some changes in dependencies.

### @axelor/aos-mobile-core

#### Fixes

- Login screen: improve display.
- FormView: refresh issue when no default value is given
- Studio form view: remove display of items preview on search bars

### @axelor/aos-mobile-ui

#### Features

- Dashboard: possibility to hide background card on chart

#### Fixes

- Dashboard: rename file to allow mobile app to work on macOS

### @axelor/aos-mobile-quality

#### Fixes

- Control entry list view: change success to primary color on toggle button

### @axelor/aos-mobile-hr

#### Fixes

- Expense line: use request to recompute totals on update
- Reducers: follow naming convention to avoid conflict.

### @axelor/aos-mobile-helpdesk

#### Fixes

- List screens: avoid page loading when search is active
- Reducers: follow naming convention to avoid conflict.

### @axelor/aos-mobile-crm

#### Fixes

- List screens: avoid page loading when search is active

### @axelor/aos-mobile-stock

#### Fixes

- Product details: hide units if product is not sellable or purchasable

## [8.0.0] (2024-02-19)

This version of the application is no more retrocompatible by default due to some new requests. Retrocompatibility can be restored by rewritting routes' path in the configuration file.

### @axelor/aos-mobile-core

#### Features

- Add new component FocusScreen which manage refresh on navigation focus
- Add new component CustomFieldForm and refactor JsonFieldsScreen
- Add new component DateDisplay, PeriodDisplay
- Add new system to fetch required web configurations of a Module object
- Add new system to link a Dashboard menu entry to the associated configuration from the web
- Menu: entries can now be hidden due to web configurations with hideIf attribute
- Menu: add compatibility management
- Menu: add possibility to create a separator
- FormView: add possibility to get objectState from custom field components
- FormView: add possibility to have an edit/readonly mode
- MailMessageView: add filter between comments and notifications
- Toast: open pop-up with the whole message on press
- DateInput: add showPopup prop to allow popup instead of dropdown display for date selection
- PlanningView: add management of assignation filter
- Internationalization: use Localization object of user to change language
- Toast: add new type with neutral border

#### Changes

- Mobile settings configuration: use new request from AOS to get configurations based on user's roles

#### Fixes

- Router: manage new AOP exception when class is not found
- Session: manage new AOP request to test user token

### @axelor/aos-mobile-ui

This version add the management of Bootstrap icons. All components and screens of the application has been migrated to the Bootsrap librairy. Custom svg icons can also be added directly from UI package. Documentation has been updated to describe process.

This version also add a new design to match AOP improvements.

#### Features

- Add new components: GroupByScrollList, CheckboxScrollList, DurationInput
- Add new component Dashboard with three types of Charts : PieChart, BarChart & LineChart
- Add new theme to match new AOP design
- Icon: add management of Bootstrap librairy

#### Changes

- ChipSelect: improve design of component
- Icon: replace FontAwesome5 prop on component by isFontAwesome4 & isFontAwesome5, default icon librairy is now Bootstrap

### New package : @axelor/aos-mobile-quality

This package is compatible with AOS Quality module from version 8.0.0.
It enables user to manage control entries through the mobile application.

### @axelor/aos-mobile-hr

#### Features

This version add a new part of the HR package, user can now manage Timesheet from the mobile application. Three menu entries have been added to see the last active timer, all timers of user and timesheets of user.

- ExpenseLine: add possibility to change expense from the form view
- ExpenseLine: add GroupByScrollList on orphan list view to group by date
- Expense: add possibility to delete a draft expense
- Expense: add possibility to manually create an expense
- Expense: use new web configurations

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

### @axelor/aos-mobile-helpdesk

#### Features

- Ticket: manage custom status

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

- Ticket: use DurationInput instead of DurationFormInput

### @axelor/aos-mobile-crm

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

- Events: use assignation filter of PlanningView instead of custom one

### @axelor/aos-mobile-manufacturing

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

### @axelor/aos-mobile-stock

#### Features

- Default stock location: manage new configuration from web module Mobile Settings for display of SearchBar on user screen
- Internal move: improve ergonomy of creation process

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

[8.0.4]: https://github.com/axelor/axelor-mobile/compare/8.0.3...8.0.4
[8.0.3]: https://github.com/axelor/axelor-mobile/compare/8.0.2...8.0.3
[8.0.2]: https://github.com/axelor/axelor-mobile/compare/8.0.1...8.0.2
[8.0.1]: https://github.com/axelor/axelor-mobile/compare/8.0.0...8.0.1
[8.0.0]: https://github.com/axelor/axelor-mobile/compare/7.2.6...8.0.0
