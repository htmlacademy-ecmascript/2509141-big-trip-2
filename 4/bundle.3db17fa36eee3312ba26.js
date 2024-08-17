(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},_={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+v(s,2,"0")+":"+v(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,a=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:o,d:a,D:d,h:r,m:i,s,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=f;var g="$isDayjsObject",b=function(t){return t instanceof S||!(!t||!t[g])},M=function t(e,n,s){var i;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(i=r),n&&(y[r]=n,i=r);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,i=o}return!s&&i&&($=i),i||!s&&$},w=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},D=_;D.l=M,D.i=b,D.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function f(t){this.$L=M(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[g]=!0}var v=f.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(p);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return D},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return w(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<w(t)},v.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!D.u(e)||e,h=D.p(t),p=function(t,e){var s=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?s:s.endOf(a)},m=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},f=this.$W,v=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case u:return c?p(1,0):p(31,11);case l:return c?p(1,v):p(0,v+1);case o:var y=this.$locale().weekStart||0,g=(f<y?f+7:f)-y;return p(c?_-g:_+(6-g),v);case a:case d:return m($+"Hours",0);case r:return m($+"Minutes",1);case i:return m($+"Seconds",2);case s:return m($+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,c=D.p(t),h="set"+(this.$u?"UTC":""),p=(o={},o[a]=h+"Date",o[d]=h+"Date",o[l]=h+"Month",o[u]=h+"FullYear",o[r]=h+"Hours",o[i]=h+"Minutes",o[s]=h+"Seconds",o[n]=h+"Milliseconds",o)[c],m=c===a?this.$D+(e-this.$W):e;if(c===l||c===u){var f=this.clone().set(d,1);f.$d[p](m),f.init(),this.$d=f.set(d,Math.min(this.$D,f.daysInMonth())).$d}else p&&this.$d[p](m);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[D.p(t)]()},v.add=function(n,c){var d,h=this;n=Number(n);var p=D.p(c),m=function(t){var e=w(h);return D.w(e.date(e.date()+Math.round(t*n)),h)};if(p===l)return this.set(l,this.$M+n);if(p===u)return this.set(u,this.$y+n);if(p===a)return m(1);if(p===o)return m(7);var f=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[p]||1,v=this.$d.getTime()+n*f;return D.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},p=function(t){return D.s(r%12||12,t,"0")},f=u||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(m,(function(t,s){return s||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return D.s(e.$y,4,"0");case"M":return o+1;case"MM":return D.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,c,3);case"MMMM":return d(c,o);case"D":return e.$D;case"DD":return D.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,l,2);case"ddd":return d(n.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(r);case"HH":return D.s(r,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return f(r,a,!0);case"A":return f(r,a,!1);case"m":return String(a);case"mm":return D.s(a,2,"0");case"s":return String(e.$s);case"ss":return D.s(e.$s,2,"0");case"SSS":return D.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,h){var p,m=this,f=D.p(d),v=w(n),_=(v.utcOffset()-this.utcOffset())*t,$=this-v,y=function(){return D.m(m,v)};switch(f){case u:p=y()/12;break;case l:p=y();break;case c:p=y()/3;break;case o:p=($-_)/6048e5;break;case a:p=($-_)/864e5;break;case r:p=$/e;break;case i:p=$/t;break;case s:p=$/1e3;break;default:p=$}return h?p:D.a(p)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=M(t,e,!0);return s&&(n.$L=s),n},v.clone=function(){return D.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},f}(),E=S.prototype;return w.prototype=E,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(t){E[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,S,w),t.$i=!0),w},w.locale=M,w.isDayjs=b,w.unix=function(t){return w(1e3*t)},w.en=y[$],w.Ls=y,w.p={},w}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2628e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:o,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof $},h=function(t,e,n){return new $(t,n,e.$l)},p=function(t){return e.p(t)+"s"},m=function(t){return t<0},f=function(t){return m(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},_=function(t,e){return t?m(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},$=function(){function m(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*u[p(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[p(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(c);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=m.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=f(t/o),t%=o,this.$d.months=f(t/l),t%=l,this.$d.days=f(t/r),t%=r,this.$d.hours=f(t/i),t%=i,this.$d.minutes=f(t/s),t%=s,this.$d.seconds=f(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=_(n,"D"),i=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=_(a,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||o.negative,c=i.format||r.format||o.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+s.format+c+i.format+r.format+o.format;return"P"===u||"-P"===u?"P0D":u},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(s[t])}))},v.as=function(t){return this.$ms/u[p(t)]},v.get=function(t){var e=this.$ms,n=p(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?f(e/u[n]):this.$d[n],e||0},v.add=function(t,e,n){var s;return s=e?t*u[p(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+s*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return h(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.valueOf=function(){return this.asMilliseconds()},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},m}(),y=function(t,e,n){return t.add(e.years()*n,"y").add(e.months()*n,"M").add(e.days()*n,"d").add(e.hours()*n,"h").add(e.minutes()*n,"m").add(e.seconds()*n,"s").add(e.milliseconds()*n,"ms")};return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return h(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)?y(this,t,1):r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)?y(this,t,-1):a.bind(this)(t,e)}}}()}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t="afterbegin";function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function s(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class i{getTemplate(){return'<form class="event event--edit" action="#" method="post"></form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const r=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],a="YY/MM/DD HH:mm",o="YYYY-MM-DDTHH:mm",l="HH:mm";var c=n(484),u=n.n(c);const d=(t,e)=>Math.floor(((t,e)=>t+Math.random()*(e-t))(t,e)),h=()=>!!d(0,2),p=t=>t[Math.floor(Math.random()*t.length)],m=(t,e)=>t?u()(t).format(e):"",f=(t,e,n)=>t.find((t=>t[e]===n)),v=[],_=t=>f(v,"type",t.toLowerCase()).offers,$=t=>{const e=[];return _(t).forEach((t=>{h()&&e.push(t)})),e},y=({type:t,offers:e})=>`<section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n      ${_(t).map((t=>(({id:t,title:e,price:n},s)=>`\n  <div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.split(" ").at(-1)}-${t}" type="checkbox" name="event-offer-${e.split(" ").at(-1)}" ${((t,e)=>((t,e)=>!!f(t,"id",e))(e,t)?"checked":"")(t,s)}>\n    <label class="event__offer-label" for="event-offer-${e.split(" ").at(-1)}-${t}">\n      <span class="event__offer-title">${e}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </label>\n  </div>`)(t,e))).join("")}\n    </div>\n  </section>`,g=({src:t,description:e})=>`<img class="event__photo" src="${t}" alt="${e}">`;class b{constructor({waypoint:t}){this.waypoint=t}getTemplate(){return t=this.waypoint,`<section class="event__details">\n            ${_(t.type).length>0?y(t):""}\n            ${t.destination?(({description:t,pictures:e})=>`<section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${t}</p>\n    ${(t=>0===t.length?"":`\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${t.map(g).join("")}\n      </div>\n    </div>`)(e)}\n  </section>`)(t.destination):""}\n          </section>`;var t}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class M{constructor(t){this.waypoints=t}getTemplate(){return(t=>{const e=t[0],{id:n,type:s}=e,i=e.base_price,r=m(e.date_from,a),o=m(e.date_to,a),l=e.destination?e.destination.name:"",c=t.map((({destination:t})=>(t=>`<option value="${t}"></option>`)(t.name))).join("");return`<header class="event__header">\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-${n}">\n        ${s}\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-${n}" type="text" name="event-destination" value="${l}" list="destination-list-${n}">\n      <datalist id="destination-list-${n}">\n        ${c}\n      </datalist>\n    </div>\n\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-${n}">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-${n}" type="text" name="event-start-time" value="${r}">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-${n}">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-${n}" type="text" name="event-end-time" value="${o}">\n    </div>\n\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-${n}">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-${n}" type="text" name="event-price" value="${i}">\n    </div>\n\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n  </header>`})(this.waypoints)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class w{constructor({waypoint:t}){this.waypoint=t}getTemplate(){return(({id:t,type:e})=>`<div class="event__type-wrapper">\n    <label class="event__type  event__type-btn" for="event-type-toggle-${t}">\n      <span class="visually-hidden">Choose event type</span>\n      <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n    </label>\n    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${t}" type="checkbox">\n\n    <div class="event__type-list">\n      <fieldset class="event__type-group">\n        <legend class="visually-hidden">Event type</legend>\n        ${r.map((e=>((t,e)=>{const n=e.toLowerCase();return`<div class="event__type-item">\n    <input id="event-type-${n}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${n}">\n    <label class="event__type-label  event__type-label--${n}" for="event-type-${n}-${t}">${e}</label>\n  </div>`})(t,e))).join("")}\n      </fieldset>\n    </div>\n  </div>`)(this.waypoint)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class D{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class S{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var E=n(646),T=n.n(E);const k=({title:t,price:e})=>`<li class="event__offer">\n    <span class="event__offer-title">${t}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${e}</span>\n  </li>`;class H{constructor({waypoint:t}){this.waypoint=t}getTemplate(){return(t=>{const{type:e}=t,{name:n}=t.destination,s=t.date_from,i=t.date_to,r=t.is_favorite,a=t.base_price,c=t.offers.map(k).join(""),d=r?" event__favorite-btn--active":"";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${m(s,"YYYY-MM-DD")}">${m(s,"MMM D")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${e}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${e} ${n}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${m(s,o)}">${m(s,l)}</time>\n            &mdash;\n            <time class="event__end-time" ${m(i,o)}">${m(i,l)}</time>\n          </p>\n          <p class="event__duration">${((t,e)=>{u().extend(T());const n=u().duration(e.diff(t));return n.days()>0?n.format("DD[D] HH[H] MM[M]"):n.hours()>0?n.format("HH[H] MM[M]"):n.format("MM[M]")})(s,i)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${a}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${c}\n        </ul>\n        <button class="event__favorite-btn${d}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`})(this.waypoint)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class Y{getTemplate(){return'<button class="event__reset-btn" type="reset">Delete</button>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class O{getTemplate(){return'<button class="event__rollup-btn" type="button">\n    <span class="visually-hidden">Open event</span>\n  </button>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class x{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n      <label class="trip-filters__filter-label" for="filter-future">Future</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n      <label class="trip-filters__filter-label" for="filter-present">Present</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n      <label class="trip-filters__filter-label" for="filter-past">Past</label>\n    </div>\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class L{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const C=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Zombies reversus ab inferno, nam malum cerebro. De carne animata corpora quaeritis. Summus sit​​, morbo vel maleficia?",name:"Prague",pictures:[{src:"https://loremflickr.com/248/152/Prague?random=1",description:"Event photo"},{src:"https://loremflickr.com/248/152/Prague?random=2",description:"Event photo"},{src:"https://loremflickr.com/248/152/Prague?random=3",description:"Event photo"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edond",description:"London is the capital of Great Britain",name:"London",pictures:[{src:"https://loremflickr.com/248/152/London?random=1",description:"Event photo"},{src:"https://loremflickr.com/248/152/London?random=2",description:"Event photo"}]},{id:"b4c3e4e6-9053-42ce-b747-e281314ber99",description:"De Apocalypsi undead dictum mauris. Hi mortuis soulless creaturas, imo monstra adventus vultus comedat cerebella viventium.",name:"Berlin",pictures:[{src:"https://loremflickr.com/248/152/Berlin?random=1",description:"Event photo"}]},{id:"b4c3e4e6-9053-42ce-b747-e281314b11or",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n                  Lingua latina non penis canina. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",name:"Rome",pictures:[]},{id:"b4c3e4e6-9053-42ce-b747-e281314bye15",description:"Ph`nglui mglw`nafh Cthulhu R`lyeh wgah`nagl fhtagn",name:"R`lyeh",pictures:[{src:"https://loremflickr.com/248/152/R`lyeh?random=1",description:"Event photo"},{src:"https://loremflickr.com/248/152/R`lyeh?random=2",description:"Event photo"},{src:"https://loremflickr.com/248/152/R`lyeh?random=3",description:"Event photo"},{src:"https://loremflickr.com/248/152/R`lyeh?random=4",description:"Event photo"},{src:"https://loremflickr.com/248/152/R`lyeh?random=5",description:"Event photo"}]}],P=()=>{const t=d(0,2e8);return u()().add(t)},j=()=>{const t=p(r);return{id:d(0,10),type:t,base_price:d(20,2e3),is_favorite:h(),date_from:u()(),date_to:P(),destination:p(C),offers:$(t)}};r.forEach((t=>v.push((t=>{const e=d(0,7),n=(s=0,()=>s<=100?s++:null);var s;const i=Array.from({length:e},(()=>((t,e)=>{const n=t();return{id:n,title:`${e} offer ${n}`,price:d(20,200)}})(n,t)));return{type:t.toLowerCase(),offers:i}})(t))));const F=new class{waypoints=Array.from({length:4},j);getWaypoints(){return this.waypoints}},W=document.querySelector(".trip-main");new class{siteFiltersContainer=document.querySelector(".trip-controls__filters");constructor({container:t}){this.container=t}init(){s(new L,this.container,t),s(new x,this.siteFiltersContainer)}}({container:W,model:F}).init();const A=document.querySelector(".trip-events"),q=new class{list=new D;editForm=new i;constructor({container:t,model:e}){this.container=t,this.model=e}render=t=>{s(new H({waypoint:t}),this.list.getElement())};init(){this.waypoints=[...this.model.getWaypoints()],s(new S,this.container),s(this.editForm,this.container),this.editingWaypoint=this.waypoints[0],this.eventHeader=new M(this.waypoints),s(this.eventHeader,this.editForm.getElement(),t),s(new w({waypoint:this.editingWaypoint}),this.eventHeader.getElement(),t),s(new Y,this.eventHeader.getElement()),s(new O,this.eventHeader.getElement()),this.eventDetails=new b({waypoint:this.editingWaypoint}),s(this.eventDetails,this.editForm.getElement()),s(this.list,this.container);for(let t=1;t<this.waypoints.length;t++)this.render(this.waypoints[t])}}({container:A,model:F});q.init()})()})();
//# sourceMappingURL=bundle.3db17fa36eee3312ba26.js.map