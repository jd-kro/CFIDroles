/*
===============================================================================
    Author:     Eric M. Barnard - @ericmbarnard                                
    License:    MIT (http://opensource.org/licenses/mit-license.php)           
                                                                               
    Description: Validation Library for KnockoutJS                             
===============================================================================
*/
(function(e){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?e(require("knockout"),exports):typeof define=="function"&&define.amd?define(["knockout","exports"],e):e(ko,ko.validation={})})(function(e,t){function l(e,n,r){return n.validator(e(),r.params===undefined?!0:r.params)?!0:(e.error(t.formatMessage(r.message||n.message,r.params)),e.__valid__(!1),!1)}function c(e,n,r){e.isValidating(!0);var i=function(i){var s=!1,o="";if(!e.__valid__()){e.isValidating(!1);return}i.message?(s=i.isValid,o=i.message):s=i,s||(e.error(t.formatMessage(o||r.message||n.message,r.params)),e.__valid__(s)),e.isValidating(!1)};n.validator(e(),r.params||!0,i)}if(typeof e===undefined)throw"Knockout is required, please ensure it is loaded before loading this validation plug-in";var n=t;e.validation=n;var r={registerExtenders:!0,messagesOnModified:!0,errorsAsTitle:!0,errorsAsTitleOnModified:!0,messageTemplate:null,insertMessages:!1,parseInputAttributes:!1,writeInputAttributes:!1,decorateElement:!0,errorClass:null,errorElementClass:"ui-state-error",errorMessageClass:"validationMessage",grouping:{deep:!1,observable:!0}},i=e.utils.extend({},r),s=["required","pattern","min","max","step"],o=["email","number","date"],u=function(e){window.setImmediate?window.setImmediate(e):window.setTimeout(e,0)},a=function(){var e=(new Date).getTime(),t={},n="__ko_validation__";return{isArray:function(e){return e.isArray||Object.prototype.toString.call(e)==="[object Array]"},isObject:function(e){return e!==null&&typeof e=="object"},values:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t},getValue:function(e){return typeof e=="function"?e():e},hasAttribute:function(e,t){return e.getAttribute(t)!==null},getAttribute:function(e,t){return e.getAttribute(t)},setAttribute:function(e,t,n){return e.setAttribute(t,n)},isValidatable:function(e){return e&&e.rules&&e.isValid&&e.isModified},insertAfter:function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},newId:function(){return e+=1},getConfigOptions:function(e){var t=a.contextFor(e);return t||i},setDomData:function(e,r){var i=e[n];i||(e[n]=i=a.newId()),t[i]=r},getDomData:function(e){var r=e[n];return r?t[r]:undefined},contextFor:function(e){switch(e.nodeType){case 1:case 8:var t=a.getDomData(e);if(t)return t;if(e.parentNode)return a.contextFor(e.parentNode)}return undefined},isEmptyVal:function(e){if(e===undefined)return!0;if(e===null)return!0;if(e==="")return!0},getOriginalElementTitle:function(e){var t=a.getAttribute(e,"data-orig-title"),n=e.title,r=a.hasAttribute(e,"data-orig-title");return r?t:n}}}(),f=function(){var n=0;return{utils:a,init:function(r,s){if(n>0&&!s)return;r=r||{},r.errorElementClass=r.errorElementClass||r.errorClass||i.errorElementClass,r.errorMessageClass=r.errorMessageClass||r.errorClass||i.errorMessageClass,e.utils.extend(i,r),i.registerExtenders&&t.registerExtenders(),n=1},configure:function(e){t.init(e)},reset:function(){i=jQuery.extend(i,r)},group:function(n,r){r=e.utils.extend(e.utils.extend({},i.grouping),r);var s=e.observableArray([]),o=null,u=function f(t,n){var i=[],o=e.utils.unwrapObservable(t);n=n!==undefined?n:r.deep?1:-1,e.isObservable(t)&&(t.isValid||t.extend({validatable:!0}),s.push(t)),o&&(a.isArray(o)?i=o:a.isObject(o)&&(i=a.values(o))),n!==0&&e.utils.arrayForEach(i,function(e){e&&!e.nodeType&&f(e,n+1)})};return r.observable?(u(n),o=e.computed(function(){var t=[];return e.utils.arrayForEach(s(),function(e){e.isValid()||t.push(e.error)}),t})):o=function(){var t=[];return s([]),u(n),e.utils.arrayForEach(s(),function(e){e.isValid()||t.push(e.error)}),t},o.showAllMessages=function(t){t===undefined&&(t=!0),o(),e.utils.arrayForEach(s(),function(e){e.isModified(t)})},n.errors=o,n.isValid=function(){return n.errors().length===0},n.isAnyMessageShown=function(){var t=!1;return o(),e.utils.arrayForEach(s(),function(e){!e.isValid()&&e.isModified()&&(t=!0)}),t},o},formatMessage:function(t,n){return typeof t=="function"?t(n):t.replace(/\{0\}/gi,e.utils.unwrapObservable(n))},addRule:function(e,t){return e.extend({validatable:!0}),e.rules.push(t),e},addAnonymousRule:function(e,n){var r=a.newId();n.message===undefined&&(n.message="Error"),t.rules[r]=n,t.addRule(e,{rule:r,params:n.params})},addExtender:function(n){e.extenders[n]=function(e,r){return r.message||r.onlyIf?t.addRule(e,{rule:n,message:r.message,params:a.isEmptyVal(r.params)?!0:r.params,condition:r.onlyIf}):t.addRule(e,{rule:n,params:r})}},registerExtenders:function(){if(i.registerExtenders)for(var n in t.rules)t.rules.hasOwnProperty(n)&&(e.extenders[n]||t.addExtender(n))},insertValidationMessage:function(e){var t=document.createElement("SPAN");return t.className=a.getConfigOptions(e).errorMessageClass,a.insertAfter(e,t),t},parseInputValidationAttributes:function(n,r){e.utils.arrayForEach(s,function(e){a.hasAttribute(n,e)&&t.addRule(r(),{rule:e,params:n.getAttribute(e)||!0})});var i=n.getAttribute("type");e.utils.arrayForEach(o,function(e){e===i&&t.addRule(r(),{rule:e==="date"?"dateISO":e,params:!0})})},writeInputValidationAttributes:function(t,n){var r=n();if(!r||!r.rules)return;var i=r.rules();e.utils.arrayForEach(s,function(n){var r,s=e.utils.arrayFirst(i,function(e){return e.rule.toLowerCase()===n.toLowerCase()});if(!s)return;r=s.params,s.rule==="pattern"&&s.params instanceof RegExp&&(r=s.params.source),t.setAttribute(n,r)}),i=null},makeBindingHandlerValidatable:function(t){var n=e.bindingHandlers[t].init;e.bindingHandlers[t].init=function(t,r,i,s,o){return n(t,r,i),e.bindingHandlers.validationCore.init(t,r,i,s,o)}}}}();e.utils.extend(n,f),n.rules={},n.rules.required={validator:function(e,t){var n=/^\s+|\s+$/g,r;return e===undefined||e===null?!t:(r=e,typeof e=="string"&&(r=e.replace(n,"")),t?(r+"").length>0:!0)},message:"This field is required."},n.rules.min={validator:function(e,t){return a.isEmptyVal(e)||e>=t},message:"Please enter a value greater than or equal to {0}."},n.rules.max={validator:function(e,t){return a.isEmptyVal(e)||e<=t},message:"Please enter a value less than or equal to {0}."},n.rules.minLength={validator:function(e,t){return a.isEmptyVal(e)||e.length>=t},message:"Please enter at least {0} characters."},n.rules.maxLength={validator:function(e,t){return a.isEmptyVal(e)||e.length<=t},message:"Please enter no more than {0} characters."},n.rules.pattern={validator:function(e,t){return a.isEmptyVal(e)||e.toString().match(t)!==null},message:"Please check this value."},n.rules.step={validator:function(e,t){return a.isEmptyVal(e)||e*100%(t*100)===0},message:"The value must increment by {0}"},n.rules.email={validator:function(e,t){return t?a.isEmptyVal(e)||t&&/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e):!0},message:"Please enter a proper email address"},n.rules.date={validator:function(e,t){return t?a.isEmptyVal(e)||t&&!/Invalid|NaN/.test(new Date(e)):!0},message:"Please enter a proper date"},n.rules.dateISO={validator:function(e,t){return t?a.isEmptyVal(e)||t&&/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e):!0},message:"Please enter a proper date"},n.rules.number={validator:function(e,t){return t?a.isEmptyVal(e)||t&&/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(e):!0},message:"Please enter a number"},n.rules.digit={validator:function(e,t){return t?a.isEmptyVal(e)||t&&/^\d+$/.test(e):!0},message:"Please enter a digit"},n.rules.phoneUS={validator:function(e,t){return t?typeof e!="string"?!1:a.isEmptyVal(e)?!0:(e=e.replace(/\s+/g,""),t&&e.length>9&&e.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)):!0},message:"Please specify a valid phone number"},n.rules.equal={validator:function(e,t){var n=t;return e===a.getValue(n)},message:"Values must equal"},n.rules.notEqual={validator:function(e,t){var n=t;return e!==a.getValue(n)},message:"Please choose another value."},n.rules.unique={validator:function(t,n){var r=a.getValue(n.collection),i=a.getValue(n.externalValue),s=0;return!t||!r?!0:(e.utils.arrayFilter(e.utils.unwrapObservable(r),function(e){t===(n.valueAccessor?n.valueAccessor(e):e)&&s++}),s<(i!==undefined&&t!==i?1:2))},message:"Please make sure the value is unique."},function(){n.registerExtenders()}(),e.bindingHandlers.validationCore=function(){return{init:function(n,r,i,s,o){var f=a.getConfigOptions(n);f.parseInputAttributes&&u(function(){t.parseInputValidationAttributes(n,r)});if(f.insertMessages&&a.isValidatable(r())){var l=t.insertValidationMessage(n);f.messageTemplate?e.renderTemplate(f.messageTemplate,{field:r()},null,l,"replaceNode"):e.applyBindingsToNode(l,{validationMessage:r()})}f.writeInputAttributes&&a.isValidatable(r())&&t.writeInputValidationAttributes(n,r),f.decorateElement&&a.isValidatable(r())&&e.applyBindingsToNode(n,{validationElement:r()})},update:function(e,t,n,r,i){}}}(),f.makeBindingHandlerValidatable("value"),f.makeBindingHandlerValidatable("checked"),e.bindingHandlers.validationMessage={update:function(t,n){var r=n(),i=a.getConfigOptions(t),s=e.utils.unwrapObservable(r),o=null,u=!1,f=!1;r.extend({validatable:!0}),u=r.isModified(),f=r.isValid();var l=function(){return!i.messagesOnModified||u?f?null:r.error:null},c=function(){return!i.messagesOnModified||u?!f:!1};e.bindingHandlers.text.update(t,l),e.bindingHandlers.visible.update(t,c)}},e.bindingHandlers.validationElement={update:function(t,n){var r=n(),i=a.getConfigOptions(t),s=e.utils.unwrapObservable(r),o=null,u=!1,f=!1;r.extend({validatable:!0}),u=r.isModified(),f=r.isValid();var l=function(){var e={},t=u?!f:!1;return i.decorateElement||(t=!1),e[i.errorElementClass]=t,e};e.bindingHandlers.css.update(t,l);if(!i.errorsAsTitle)return;var c=a.getAttribute(t,"data-orig-title"),h=t.title,p=a.getAttribute(t,"data-orig-title")==="true",d=function(){if(!i.errorsAsTitleOnModified||u)return f?{title:a.getOriginalElementTitle(t),"data-orig-title":null}:{title:r.error,"data-orig-title":a.getOriginalElementTitle(t)}};e.bindingHandlers.attr.update(t,d)}},e.bindingHandlers.validationOptions=function(){return{init:function(t,n,r,s,o){var u=e.utils.unwrapObservable(n());if(u){var f=e.utils.extend({},i);e.utils.extend(f,u),a.setDomData(t,f)}}}}(),e.extenders.validation=function(n,r){return e.utils.arrayForEach(a.isArray(r)?r:[r],function(e){t.addAnonymousRule(n,e)}),n},e.extenders.validatable=function(n,r){if(r&&!a.isValidatable(n)){n.error=e.observable(null),n.rules=e.observableArray(),n.isValidating=e.observable(!1),n.__valid__=e.observable(!0),n.isModified=e.observable(!1);var i=e.computed(function(){var e=n(),r=n.rules();return t.validateObservable(n),!0});n.isValid=e.computed(function(){return n.__valid__()});var s=n.subscribe(function(){n.isModified(!0)});n._disposeValidation=function(){n.isValid.dispose(),n.rules.removeAll(),n.isModified._subscriptions.change=[],n.isValidating._subscriptions.change=[],n.__valid__._subscriptions.change=[],s.dispose(),i.dispose(),delete n.rules,delete n.error,delete n.isValid,delete n.isValidating,delete n.__valid__,delete n.isModified}}else r===!1&&a.isValidatable(n)&&n._disposeValidation&&n._disposeValidation();return n},n.validateObservable=function(e){var n=0,r,i,s=e.rules(),o=s.length;for(;n<o;n++){i=s[n];if(i.condition&&!i.condition())continue;r=t.rules[i.rule];if(r.async||i.async)c(e,r,i);else if(!l(e,r,i))return!1}return e.error(null),e.__valid__(!0),!0},e.validatedObservable=function(n){if(!t.utils.isObject(n))return e.observable(n).extend({validatable:!0});var r=e.observable(n);return r.errors=t.group(n),r.isValid=e.computed(function(){return r.errors().length===0}),r},n.localize=function(e){var n,r;for(r in e)t.rules.hasOwnProperty(r)&&(t.rules[r].message=e[r])},e.applyBindingsWithValidation=function(n,r,i){var s=arguments.length,o,u;s>2?(o=r,u=i):s<2?o=document.body:arguments[1].nodeType?o=r:u=arguments[1],t.init(),u&&t.utils.setDomData(o,u),e.applyBindings(n,r)};var h=e.applyBindings;e.applyBindings=function(e,n){t.init(),h(e,n)}});