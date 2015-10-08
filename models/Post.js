var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * =============
 */

var Post = new keystone.List('Post', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' },
  sortable: true
});

Post.add(
  {heading: 'Info'},
  {title: {type: String, required: true, initial: true},
  css_id: {type: String, label: "Unique CSS ID", required: true, note: "Make sure the id is unique", initial: true},
  bg_color: {type: Types.Color, required: true, initial: true, note: "Input rgba and make sure the transparency is set to .8"},
  state: { type: Types.Select, options: 'draft, published', default: 'draft', note: "Draft will go to youthradio.org/yristaging - Published will go to youthradio.org/westsidestories" },
  source: {type: String},
  location: {type: Types.Location, required: true, initial: true},
  description: {type: Types.Html, wysiwyg: true, required: true, initial: true}},
  {heading: 'Media'},
  {icon_active: {type: Types.S3File, note: "image should be 120px x 120px and be a .png", filename: function(item, filename){
    return "active_icon" + '_'  + item._id + '_' + filename;
  }},
  icon: {type: Types.S3File,note: "image should be 80px x 80px be a .png", filename: function(item, filename){
    return "inactive_icon" + '_' + item._id + '_' + filename;
  }},
  illustration: {type: Types.S3File, filename: function(item, filename){
    return "illustration" + '_' +item._id + '_' + filename;
  }},
  audio: {type: Types.S3File, filename: function(item, filename){
    return "audio" + '_' + item._id + '_' + filename;
  }},
  video: {type: Types.Html, height: 20}}
);

/**
 * Registration
 */

Post.defaultColumns = "title, location, state";
Post.register();