import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the actual form script without sending customer data or network requests.
class Field {
  constructor(name, value = '') { Object.assign(this, { name, value, id: `q-${name}`, required: false, disabled: false, checked: false, hidden: false, listeners: {}, attrs: {}, classList: { add() {}, remove() {}, toggle() {} } }); }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  dispatchEvent(event) { event.target ||= this; for (const fn of this.listeners[event.type] || []) fn(event); if (event.bubbles) this.form?.dispatchEvent(event); }
  checkValidity() { return !this.required || !!this.value.trim(); }
  setAttribute(k, v) { this.attrs[k] = v; }
  removeAttribute(k) { delete this.attrs[k]; }
  focus() { this.focused = true; }
}
class Radios extends Array { get value() { return this.find(x => x.checked)?.value || ''; } }
function setup(endpoint, plan = '') {
  const nodes = {}, controls = {}, links = [], calls = [], events = [];
  const node = id => nodes[id] ||= new Field(id);
  const form = new Field('form'); form.action = endpoint; form.elements = controls;
  const groups = {
    service: [['regular','House cleaning'],['one-time','One-time or deep clean'],['move','Move-in / move-out'],['clutter','Clutter or hoarding cleanup']],
    frequency: [['weekly','Weekly'],['every-other-week','Every other week'],['monthly','Monthly'],['once','One-time'],['unsure','Not sure yet']],
    contact_method: [['call','Call'],['text','Text'],['email','Email']],
  };
  for (const [name, options] of Object.entries(groups)) controls[name] = Radios.from(options.map(([plan,value]) => Object.assign(new Field(name,value), { plan, form })));
  for (const [name,value] of Object.entries({zip:'92008',bedrooms:'Studio',bathrooms:'1',name:'Example',phone:'7604929338',email:''})) controls[name] = Object.assign(new Field(name,value),{required: !['phone','email'].includes(name),form});
  form.querySelector = selector => {
    const match = selector.match(/input\[name="([^"]+)"\]\[data-plan="([^"]*)"\]/);
    if (match) return controls[match[1]].find(x => x.plan === match[2]);
    return node(selector);
  };
  form.querySelectorAll = () => controls.contact_method;
  form.reset = () => { for (const value of Object.values(controls)) { if (value instanceof Radios) value.forEach(x => x.checked=false); else value.value=''; } };
  const document = {
    referrer:'', head:{append(){}}, createElement:()=>({}),
    querySelector: selector => selector === '.quote-form' ? form : null,
    querySelectorAll: () => links,
    getElementById: node,
  };
  let responseOk = true;
  const window = { dispatchEvent: event => events.push(event.detail.event) };
  const context = {document,window,location:{search:plan ? '?plan='+plan : '',pathname:'/index.html',origin:'https://example.test'},history:{replaceState(){}},URL,URLSearchParams,CSS:{escape:x=>x},RadioNodeList:Radios,Event:class {constructor(type,options={}) {Object.assign(this,{type},options)}},CustomEvent:class {constructor(type,options){Object.assign(this,{type},options)}},FormData:class{},fetch:async(...args)=>{calls.push(args);return {ok:responseOk,statusText:'Error'}},Date,Set};
  vm.runInNewContext(readFileSync(new URL('../script.js',import.meta.url),'utf8'), context);
  return {form,controls,node,calls,events,setOk:value=>responseOk=value};
}
const ready = 'https://formspree.io/f/example';
for (const [plan,service,frequency] of [['weekly','House cleaning','Weekly'],['monthly','House cleaning','Monthly'],['clutter','Clutter or hoarding cleanup','One-time'],['move','Move-in / move-out','One-time']]) {
  const x=setup(ready,plan); assert.equal(x.controls.service.value,service); assert.equal(x.controls.frequency.value,frequency);
}
const x=setup(ready,'weekly');
function chooseContact(value) { x.controls.contact_method.forEach(f=>f.checked=f.value===value); x.controls.contact_method.find(f=>f.checked).dispatchEvent({type:'change',bubbles:true}); }
chooseContact('Email'); assert.equal(x.controls.phone.disabled,true); assert.equal(x.controls.email.required,true); assert.equal(x.node('phone-field').hidden,true);
chooseContact('Text'); assert.equal(x.controls.email.disabled,true); assert.equal(x.controls.phone.required,true);
x.controls.phone.value='27604929338'; await x.form.listeners.submit[0]({preventDefault(){}}); assert.equal(x.calls.length,0); assert.equal(x.controls.phone.attrs['aria-invalid'],'true');
x.controls.phone.value='+1 (760) 492-9338'; await x.form.listeners.submit[0]({preventDefault(){}}); assert.equal(x.calls.length,1); assert.ok(x.events.includes('quote_submitted'));
const failed=setup(ready,'clutter'); failed.controls.contact_method[0].checked=true; failed.controls.contact_method[0].dispatchEvent({type:'change',bubbles:true}); failed.setOk(false); await failed.form.listeners.submit[0]({preventDefault(){}}); assert.equal(failed.controls.name.value,'Example'); assert.ok(failed.events.includes('quote_error'));
const unavailable=setup('https://formspree.io/f/YOUR_FORM_ID'); assert.equal(unavailable.node('button[type=submit]').disabled,true); assert.equal(unavailable.node('.form-unavailable').hidden,false); await unavailable.form.listeners.submit[0]({preventDefault(){}}); assert.equal(unavailable.calls.length,0);
console.log('Quote checks passed: plan selection, contact switching, US phone validation, success, failure preservation, placeholder fallback. No network requests sent.');
