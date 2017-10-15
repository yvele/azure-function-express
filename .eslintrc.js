module.exports = {
  parser  : "babel-eslint",
  extends : "airbnb-base",
  rules   : {

    // Enforce the consistent use of double quotes
    quotes : ["error", "double", { avoidEscape: true }],

    // Allow bitwise operators
    "no-bitwise"  : "off",

    // Allow the unary operators ++ and --
    "no-plusplus" : "off",

    // Require or disallow trailing commas
    "comma-dangle": ["error", "only-multiline"],

    // Disallow Reassignment of Function Parameters
    "no-param-reassign" : ["error", { props: false }],

    // Enforce consistent spacing between keys and values in object literal properties
    "key-spacing" : ["error", {
      singleLine : {
        beforeColon : false,
        afterColon  : true
      },
      multiLine : {
        beforeColon : true,
        afterColon  : true,
        mode        : "minimum"
      }
    }],

    // Disallow multiple spaces
    "no-multi-spaces" : ["error", { ignoreEOLComments: true }],

    // Require or disallow padding within blocks
    "padded-blocks": ["error", { classes: "always" }]
  }
};
