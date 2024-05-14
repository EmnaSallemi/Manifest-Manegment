/**
 * Sources:
 *
 * Angular JSON Schema Form examples ('ng-jsf-...') are original
 *
 * JSON Meta-Schemas ('json-schema-...') are from
 *   http://json-schema.org/specification-links.html
 *
 * Angular Schema Form (AngularJS) examples ('asf-...') are from
 *   http://schemaform.io/examples/bootstrap-example.html
 *
 * React JSON Schema Form examples ('rjsf-...') are from
 *   https://mozilla-services.github.io/react-jsonschema-form/
 *
 * JSONForm (jQuery) examples ('jsf-...') are from
 *   http://ulion.github.io/jsonform/playground/
 */

export const Examples: any = {
  'ng-jsf': {
    name: 'JSON Schema Form examples',
    schemas: [
      { name: 'Deployment',                  file: 'ng-jsf-deployment-examples', },
      // { name: 'Simple Array',                    file: 'ng-jsf-simple-array', },
      //{ name: 'Nested Arrays',                   file: 'ng-jsf-nested-arrays', },
      //{ name: 'Deep Recursive References',       file: 'ng-jsf-deep-ref', },
      //{ name: 'Select Control Lists',            file: 'ng-jsf-select-list-examples', },
      // { name: 'Select Control Widgets',          file: 'ng-jsf-select-widget-examples', },
      //{ name: 'Data Only (no Schema or Layout)', file: 'ng-jsf-data-only', },
       //{ name: 'Layout Only (no Schema or Data)', file: 'ng-jsf-layout-only', },
      // { name: 'JSON Meta-Schema - Draft 6',    file: 'json-schema-draft06', },
      // { name: 'JSON Meta-Schema - Draft 4',    file: 'json-schema-draft04', },
      // { name: 'JSON Meta-Schema - Draft 3',    file: 'json-schema-draft03', },
      // { name: 'JSON Meta-Schema - Draft 2',    file: 'json-schema-draft02', },
      // { name: 'JSON Meta-Schema - Draft 1',    file: 'json-schema-draft01', },
    ]
  },
  'asf': {
    name: 'Other Examples',
    url: 'http://schemaform.io/examples/bootstrap-example.html',
    schemas: [
      //{ name: 'Simple',                     file: 'asf-simple', },
      //{ name: 'Basic JSON Schema Type',     file: 'asf-basic-json-schema-type', },
      //{ name: 'Bootstrap Grid',             file: 'asf-bootstrap-grid', },
      //{ name: 'Complex Key Support',        file: 'asf-complex-key-support', },
      //{ name: 'Array',                      file: 'asf-array', },
      //{ name: 'Tab Array',                  file: 'asf-tab-array', },
      { name: 'Pod ',               file: 'asf-Pod-examples', },
      //{ name: 'Kitchen Sink',               file: 'asf-kitchen-sink', },
      { name: 'ConfigMap ', file: 'asf-configMap-examples', },
    ]
  },
  'rjsf': {
    name: 'React JSON Schema Form examples',
    url: 'https://mozilla-services.github.io/react-jsonschema-form/',
    schemas: [
      { name: 'Simple',                     file: 'rjsf-simple', },
      { name: 'Nested',                     file: 'rjsf-nested', },
      { name: 'Arrays',                     file: 'rjsf-arrays', },
      { name: 'Numbers',                    file: 'rjsf-numbers', },
      { name: 'Widgets',                    file: 'rjsf-widgets', },
      { name: 'Ordering',                   file: 'rjsf-ordering', },
      { name: 'References',                 file: 'rjsf-references', },
      { name: 'Custom',                     file: 'rjsf-custom', },
      { name: 'Errors',                     file: 'rjsf-errors', },
      { name: 'Large',                      file: 'rjsf-large', },
      { name: 'Date & Time',                file: 'rjsf-date-and-time', },
      { name: 'Validation',                 file: 'rjsf-validation', },
      { name: 'Files',                      file: 'rjsf-files', },
      { name: 'Single',                     file: 'rjsf-single', },
      // { name: 'Custom Array',               file: 'rjsf-custom-array', },
      { name: 'Alternatives',               file: 'rjsf-alternatives', },
    ]
  },
  'jsf': {
    name: 'JSONForm (jQuery) examples',
    url: 'http://ulion.github.io/jsonform/playground/',
    schemas: [
          ]
  }
};
