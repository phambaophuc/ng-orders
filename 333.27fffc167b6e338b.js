"use strict";(self.webpackChunkmanage_shop=self.webpackChunkmanage_shop||[]).push([[333],{3333:(W,v,p)=>{p.r(v),p.d(v,{AccountModule:()=>G});var u=p(6814),C=p(4190),e=p(5879),Z=p(3076);function k(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"a",12),e.NdJ("keyup.enter",function(){e.CHM(t),e.oxw(3);const s=e.MAs(1);return e.KtG(s.previous())})("click",function(){e.CHM(t),e.oxw(3);const s=e.MAs(1);return e.KtG(s.previous())}),e._uU(1),e.TgZ(2,"span",13),e._uU(3),e.qZA()()}if(2&n){const t=e.oxw(3);e.xp6(1),e.hij(" ",t.previousLabel," "),e.xp6(2),e.Oqu(t.screenReaderPageLabel)}}function T(n,i){if(1&n&&(e.TgZ(0,"span",14),e._uU(1),e.TgZ(2,"span",13),e._uU(3),e.qZA()()),2&n){const t=e.oxw(3);e.xp6(1),e.hij(" ",t.previousLabel," "),e.xp6(2),e.Oqu(t.screenReaderPageLabel)}}function L(n,i){if(1&n&&(e.TgZ(0,"li",9),e.YNc(1,k,4,2,"a",10),e.YNc(2,T,4,2,"span",11),e.qZA()),2&n){e.oxw(2);const t=e.MAs(1);e.ekj("disabled",t.isFirstPage()),e.xp6(1),e.Q6J("ngIf",1<t.getCurrent()),e.xp6(1),e.Q6J("ngIf",t.isFirstPage())}}function w(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"a",12),e.NdJ("keyup.enter",function(){e.CHM(t);const s=e.oxw().$implicit;e.oxw(2);const r=e.MAs(1);return e.KtG(r.setCurrent(s.value))})("click",function(){e.CHM(t);const s=e.oxw().$implicit;e.oxw(2);const r=e.MAs(1);return e.KtG(r.setCurrent(s.value))}),e.TgZ(1,"span",13),e._uU(2),e.qZA(),e.TgZ(3,"span"),e._uU(4),e.ALo(5,"number"),e.qZA()()}if(2&n){const t=e.oxw().$implicit,a=e.oxw(2);e.xp6(2),e.hij("",a.screenReaderPageLabel," "),e.xp6(2),e.Oqu("..."===t.label?t.label:e.xi3(5,2,t.label,""))}}function y(n,i){if(1&n&&(e.ynx(0),e.TgZ(1,"span",16)(2,"span",13),e._uU(3),e.qZA(),e.TgZ(4,"span"),e._uU(5),e.ALo(6,"number"),e.qZA()(),e.BQk()),2&n){const t=e.oxw().$implicit,a=e.oxw(2);e.xp6(3),e.hij("",a.screenReaderCurrentLabel," "),e.xp6(2),e.Oqu("..."===t.label?t.label:e.xi3(6,2,t.label,""))}}function I(n,i){if(1&n&&(e.TgZ(0,"li"),e.YNc(1,w,6,5,"a",10),e.YNc(2,y,7,5,"ng-container",15),e.qZA()),2&n){const t=i.$implicit;e.oxw(2);const a=e.MAs(1);e.ekj("current",a.getCurrent()===t.value)("ellipsis","..."===t.label),e.xp6(1),e.Q6J("ngIf",a.getCurrent()!==t.value),e.xp6(1),e.Q6J("ngIf",a.getCurrent()===t.value)}}function M(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"a",12),e.NdJ("keyup.enter",function(){e.CHM(t),e.oxw(3);const s=e.MAs(1);return e.KtG(s.next())})("click",function(){e.CHM(t),e.oxw(3);const s=e.MAs(1);return e.KtG(s.next())}),e._uU(1),e.TgZ(2,"span",13),e._uU(3),e.qZA()()}if(2&n){const t=e.oxw(3);e.xp6(1),e.hij(" ",t.nextLabel," "),e.xp6(2),e.Oqu(t.screenReaderPageLabel)}}function O(n,i){if(1&n&&(e.TgZ(0,"span",14),e._uU(1),e.TgZ(2,"span",13),e._uU(3),e.qZA()()),2&n){const t=e.oxw(3);e.xp6(1),e.hij(" ",t.nextLabel," "),e.xp6(2),e.Oqu(t.screenReaderPageLabel)}}function U(n,i){if(1&n&&(e.TgZ(0,"li",17),e.YNc(1,M,4,2,"a",10),e.YNc(2,O,4,2,"span",11),e.qZA()),2&n){e.oxw(2);const t=e.MAs(1);e.ekj("disabled",t.isLastPage()),e.xp6(1),e.Q6J("ngIf",!t.isLastPage()),e.xp6(1),e.Q6J("ngIf",t.isLastPage())}}function q(n,i){if(1&n&&(e.TgZ(0,"ul",4),e.YNc(1,L,3,4,"li",5),e.TgZ(2,"li",6),e._uU(3),e.qZA(),e.YNc(4,I,3,6,"li",7),e.YNc(5,U,3,4,"li",8),e.qZA()),2&n){const t=e.oxw(),a=e.MAs(1);e.ekj("responsive",t.responsive),e.xp6(1),e.Q6J("ngIf",t.directionLinks),e.xp6(2),e.AsE(" ",a.getCurrent()," / ",a.getLastPage()," "),e.xp6(1),e.Q6J("ngForOf",a.pages)("ngForTrackBy",t.trackByIndex),e.xp6(1),e.Q6J("ngIf",t.directionLinks)}}class b{constructor(){this.change=new e.vpe,this.instances={},this.DEFAULT_ID="DEFAULT_PAGINATION_ID"}defaultId(){return this.DEFAULT_ID}register(i){return null==i.id&&(i.id=this.DEFAULT_ID),this.instances[i.id]?this.updateInstance(i):(this.instances[i.id]=i,!0)}updateInstance(i){let t=!1;for(let a in this.instances[i.id])i[a]!==this.instances[i.id][a]&&(this.instances[i.id][a]=i[a],t=!0);return t}getCurrentPage(i){return this.instances[i]?this.instances[i].currentPage:1}setCurrentPage(i,t){if(this.instances[i]){let a=this.instances[i];t<=Math.ceil(a.totalItems/a.itemsPerPage)&&1<=t&&(this.instances[i].currentPage=t,this.change.emit(i))}}setTotalItems(i,t){this.instances[i]&&0<=t&&(this.instances[i].totalItems=t,this.change.emit(i))}setItemsPerPage(i,t){this.instances[i]&&(this.instances[i].itemsPerPage=t,this.change.emit(i))}getInstance(i=this.DEFAULT_ID){return this.instances[i]?this.clone(this.instances[i]):{}}clone(i){var t={};for(var a in i)i.hasOwnProperty(a)&&(t[a]=i[a]);return t}}const D=Number.MAX_SAFE_INTEGER;let F=(()=>{class n{constructor(t){this.service=t,this.state={}}transform(t,a){if(!(t instanceof Array)){let d=a.id||this.service.defaultId();return this.state[d]?this.state[d].slice:t}let l,g,s=a.totalItems&&a.totalItems!==t.length,r=this.createInstance(t,a),o=r.id,c=r.itemsPerPage,f=this.service.register(r);if(!s&&t instanceof Array){if(c=+c||D,l=(r.currentPage-1)*c,g=l+c,this.stateIsIdentical(o,t,l,g))return this.state[o].slice;{let _=t.slice(l,g);return this.saveState(o,t,_,l,g),this.service.change.emit(o),_}}return f&&this.service.change.emit(o),this.saveState(o,t,t,l,g),t}createInstance(t,a){return this.checkConfig(a),{id:null!=a.id?a.id:this.service.defaultId(),itemsPerPage:+a.itemsPerPage||0,currentPage:+a.currentPage||1,totalItems:+a.totalItems||t.length}}checkConfig(t){const s=["itemsPerPage","currentPage"].filter(r=>!(r in t));if(0<s.length)throw new Error(`PaginatePipe: Argument is missing the following required properties: ${s.join(", ")}`)}saveState(t,a,s,r,o){this.state[t]={collection:a,size:a.length,slice:s,start:r,end:o}}stateIsIdentical(t,a,s,r){let o=this.state[t];return!(!o||o.size!==a.length||o.start!==s||o.end!==r)&&o.slice.every((g,c)=>g===a[s+c])}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(b,16))},n.\u0275pipe=e.Yjl({name:"paginate",type:n,pure:!1}),n})(),N=(()=>{class n{constructor(t,a){this.service=t,this.changeDetectorRef=a,this.maxSize=7,this.pageChange=new e.vpe,this.pageBoundsCorrection=new e.vpe,this.pages=[],this.changeSub=this.service.change.subscribe(s=>{this.id===s&&(this.updatePageLinks(),this.changeDetectorRef.markForCheck(),this.changeDetectorRef.detectChanges())})}ngOnInit(){void 0===this.id&&(this.id=this.service.defaultId()),this.updatePageLinks()}ngOnChanges(t){this.updatePageLinks()}ngOnDestroy(){this.changeSub.unsubscribe()}previous(){this.checkValidId(),this.setCurrent(this.getCurrent()-1)}next(){this.checkValidId(),this.setCurrent(this.getCurrent()+1)}isFirstPage(){return 1===this.getCurrent()}isLastPage(){return this.getLastPage()===this.getCurrent()}setCurrent(t){this.pageChange.emit(t)}getCurrent(){return this.service.getCurrentPage(this.id)}getLastPage(){let t=this.service.getInstance(this.id);return t.totalItems<1?1:Math.ceil(t.totalItems/t.itemsPerPage)}getTotalItems(){return this.service.getInstance(this.id).totalItems}checkValidId(){null==this.service.getInstance(this.id).id&&console.warn(`PaginationControlsDirective: the specified id "${this.id}" does not match any registered PaginationInstance`)}updatePageLinks(){let t=this.service.getInstance(this.id);const a=this.outOfBoundCorrection(t);a!==t.currentPage?setTimeout(()=>{this.pageBoundsCorrection.emit(a),this.pages=this.createPageArray(t.currentPage,t.itemsPerPage,t.totalItems,this.maxSize)}):this.pages=this.createPageArray(t.currentPage,t.itemsPerPage,t.totalItems,this.maxSize)}outOfBoundCorrection(t){const a=Math.ceil(t.totalItems/t.itemsPerPage);return a<t.currentPage&&0<a?a:t.currentPage<1?1:t.currentPage}createPageArray(t,a,s,r){r=+r;let o=[];const l=Math.max(Math.ceil(s/a),1),g=Math.ceil(r/2),c=t<=g,f=l-g<t,d=!c&&!f;let _=r<l,h=1;for(;h<=l&&h<=r;){let P,A=this.calculatePageNumber(h,t,r,l);P=_&&(2===h&&(d||f)||h===r-1&&(d||c))?"...":A,o.push({label:P,value:A}),h++}return o}calculatePageNumber(t,a,s,r){let o=Math.ceil(s/2);return t===s?r:1===t?t:s<r?r-o<a?r-s+t:o<a?a-o+t:t:t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(b),e.Y36(e.sBO))},n.\u0275dir=e.lG2({type:n,selectors:[["pagination-template"],["","pagination-template",""]],inputs:{id:"id",maxSize:"maxSize"},outputs:{pageChange:"pageChange",pageBoundsCorrection:"pageBoundsCorrection"},exportAs:["paginationApi"],features:[e.TTD]}),n})();function x(n){return!!n&&"false"!==n}let B=(()=>{class n{constructor(){this.maxSize=7,this.previousLabel="Previous",this.nextLabel="Next",this.screenReaderPaginationLabel="Pagination",this.screenReaderPageLabel="page",this.screenReaderCurrentLabel="You're on page",this.pageChange=new e.vpe,this.pageBoundsCorrection=new e.vpe,this._directionLinks=!0,this._autoHide=!1,this._responsive=!1}get directionLinks(){return this._directionLinks}set directionLinks(t){this._directionLinks=x(t)}get autoHide(){return this._autoHide}set autoHide(t){this._autoHide=x(t)}get responsive(){return this._responsive}set responsive(t){this._responsive=x(t)}trackByIndex(t){return t}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["pagination-controls"]],inputs:{id:"id",maxSize:"maxSize",directionLinks:"directionLinks",autoHide:"autoHide",responsive:"responsive",previousLabel:"previousLabel",nextLabel:"nextLabel",screenReaderPaginationLabel:"screenReaderPaginationLabel",screenReaderPageLabel:"screenReaderPageLabel",screenReaderCurrentLabel:"screenReaderCurrentLabel"},outputs:{pageChange:"pageChange",pageBoundsCorrection:"pageBoundsCorrection"},decls:4,vars:4,consts:[[3,"id","maxSize","pageChange","pageBoundsCorrection"],["p","paginationApi"],["role","navigation"],["class","ngx-pagination",3,"responsive",4,"ngIf"],[1,"ngx-pagination"],["class","pagination-previous",3,"disabled",4,"ngIf"],[1,"small-screen"],[3,"current","ellipsis",4,"ngFor","ngForOf","ngForTrackBy"],["class","pagination-next",3,"disabled",4,"ngIf"],[1,"pagination-previous"],["tabindex","0",3,"keyup.enter","click",4,"ngIf"],["aria-disabled","true",4,"ngIf"],["tabindex","0",3,"keyup.enter","click"],[1,"show-for-sr"],["aria-disabled","true"],[4,"ngIf"],["aria-live","polite"],[1,"pagination-next"]],template:function(t,a){if(1&t&&(e.TgZ(0,"pagination-template",0,1),e.NdJ("pageChange",function(r){return a.pageChange.emit(r)})("pageBoundsCorrection",function(r){return a.pageBoundsCorrection.emit(r)}),e.TgZ(2,"nav",2),e.YNc(3,q,6,8,"ul",3),e.qZA()()),2&t){const s=e.MAs(1);e.Q6J("id",a.id)("maxSize",a.maxSize),e.xp6(2),e.uIk("aria-label",a.screenReaderPaginationLabel),e.xp6(1),e.Q6J("ngIf",!(a.autoHide&&s.pages.length<=1))}},dependencies:[N,u.O5,u.sg,u.JJ],styles:['.ngx-pagination{margin-left:0;margin-bottom:1rem}.ngx-pagination:before,.ngx-pagination:after{content:" ";display:table}.ngx-pagination:after{clear:both}.ngx-pagination li{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;margin-right:.0625rem;border-radius:0}.ngx-pagination li{display:inline-block}.ngx-pagination a,.ngx-pagination button{color:#0a0a0a;display:block;padding:.1875rem .625rem;border-radius:0}.ngx-pagination a:hover,.ngx-pagination button:hover{background:#e6e6e6}.ngx-pagination .current{padding:.1875rem .625rem;background:#2199e8;color:#fefefe;cursor:default}.ngx-pagination .disabled{padding:.1875rem .625rem;color:#cacaca;cursor:default}.ngx-pagination .disabled:hover{background:transparent}.ngx-pagination a,.ngx-pagination button{cursor:pointer}.ngx-pagination .pagination-previous a:before,.ngx-pagination .pagination-previous.disabled:before{content:"\\ab";display:inline-block;margin-right:.5rem}.ngx-pagination .pagination-next a:after,.ngx-pagination .pagination-next.disabled:after{content:"\\bb";display:inline-block;margin-left:.5rem}.ngx-pagination .show-for-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.ngx-pagination .small-screen{display:none}@media screen and (max-width: 601px){.ngx-pagination.responsive .small-screen{display:inline-block}.ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next){display:none}}\n'],encapsulation:2,changeDetection:0}),n})(),E=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[b],imports:[[u.ez]]}),n})();var m=p(6223);function S(n,i){if(1&n&&(e.TgZ(0,"option",40),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}const J=function(n,i){return{"badge-soft-success":n,"badge-soft-primary":i}};function j(n,i){if(1&n&&(e.TgZ(0,"tr")(1,"th",41)(2,"div",29),e._UZ(3,"input",42)(4,"label",43),e.qZA()(),e.TgZ(5,"td"),e._UZ(6,"img",44),e.TgZ(7,"a",45),e._uU(8),e.qZA()(),e.TgZ(9,"td")(10,"span",46),e._uU(11),e.qZA()(),e.TgZ(12,"td"),e._uU(13),e.qZA(),e.TgZ(14,"td")(15,"ul",47)(16,"li",48)(17,"a",49),e._UZ(18,"i",50),e.qZA()(),e.TgZ(19,"li",48)(20,"a",51),e._UZ(21,"i",52),e.qZA()(),e.TgZ(22,"li",53)(23,"a",54),e._UZ(24,"i",55),e.qZA(),e.TgZ(25,"div",22)(26,"a",23),e._uU(27,"Action"),e.qZA(),e.TgZ(28,"a",23),e._uU(29,"Another action"),e.qZA(),e.TgZ(30,"a",23),e._uU(31,"Something else here"),e.qZA()()()()()()),2&n){const t=i.$implicit;e.xp6(6),e.s9C("src",t.photoURL||"https://bootdey.com/img/Content/avatar/avatar1.png",e.LSH),e.xp6(2),e.Oqu(t.displayName||"Ng\u01b0\u1eddi b\xed \u1ea9n"),e.xp6(2),e.Q6J("ngClass",e.WLB(5,J,t.shopId,!t.shopId)),e.xp6(1),e.hij(" ",t.shopId?"Qu\u1ea3n l\xfd c\u1eeda h\xe0ng":"Ng\u01b0\u1eddi d\xf9ng"," "),e.xp6(2),e.Oqu(t.email)}}const z=function(n,i){return{itemsPerPage:n,currentPage:i}};let R=(()=>{class n{constructor(t){this.userService=t,this.users=[],this.currentPage=1,this.itemsPerPageOptions=[10,20,50,100],this.itemsPerPage=this.itemsPerPageOptions[0],this.getAllUsers()}getAllUsers(){this.userService.getUsers().subscribe(t=>{this.users=t})}static#e=this.\u0275fac=function(a){return new(a||n)(e.Y36(Z.K))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-list-account"]],decls:70,vars:13,consts:[[1,"container"],[1,"row","align-items-center"],[1,"col-md-6"],[1,"mb-3"],[1,"card-title"],[1,"text-muted","fw-normal","ms-2"],[1,"form-inline"],["for","itemsPerPage",1,"me-2"],["id","itemsPerPage",1,"form-control-sm","mr-2",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"d-flex","flex-wrap","align-items-center","justify-content-end","gap-2","mb-3"],[1,"nav","nav-pills"],[1,"nav-item"],["aria-current","page","href","javascript:","data-bs-toggle","tooltip","data-bs-placement","top","title","","data-bs-original-title","List","aria-label","List",1,"router-link-active","router-link-exact-active","nav-link","active"],[1,"fas","fa-list-ul"],["href","javascript:","data-bs-toggle","tooltip","data-bs-placement","top","title","","data-bs-original-title","Grid","aria-label","Grid",1,"nav-link"],[1,"fas","fa-th"],["href","javascript:","data-bs-toggle","modal","data-bs-target",".add-new",1,"btn"],[1,"fas","fa-plus","me-1"],[1,"dropdown"],["href","javascript:","role","button","data-bs-toggle","dropdown","aria-expanded","false",1,"btn","btn-link","text-muted","py-1","font-size-16","shadow-none","dropdown-toggle"],[1,"fas","fa-ellipsis-h"],[1,"dropdown-menu","dropdown-menu-end"],["href","javascript:",1,"dropdown-item"],[1,"row"],[1,"col-lg-12"],[1,""],[1,"table","project-list-table","table-nowrap","align-middle","table-borderless"],["scope","col",1,"ps-4",2,"width","50px"],[1,"form-check","font-size-16"],["type","checkbox","id","contacusercheck",1,"form-check-input"],["for","contacusercheck",1,"form-check-label"],["scope","col"],["scope","col",2,"width","200px"],[4,"ngFor","ngForOf"],[1,"row","g-0","align-items-center","pb-4"],[1,"col-sm-6"],[1,"mb-sm-0"],[1,"float-sm-end"],[3,"pageChange"],[3,"value"],["scope","row",1,"ps-4"],["type","checkbox","id","contacusercheck1",1,"form-check-input"],["for","contacusercheck1",1,"form-check-label"],["alt","",1,"avatar-sm","rounded-circle","me-2",3,"src"],["href","javascript:",1,"text-body"],[1,"badge","mb-0",3,"ngClass"],[1,"list-inline","mb-0"],[1,"list-inline-item"],["href","javascript:void(0);","data-bs-toggle","tooltip","data-bs-placement","top","title","Edit",1,"px-2","text-primary"],[1,"fas","fa-pencil-alt","font-size-18"],["href","javascript:void(0);","data-bs-toggle","tooltip","data-bs-placement","top","title","Delete",1,"px-2","text-danger"],[1,"fas","fa-trash-alt","font-size-18"],[1,"list-inline-item","dropdown"],["href","javascript:","role","button","data-bs-toggle","dropdown","aria-haspopup","true",1,"text-muted","dropdown-toggle","font-size-18","px-2"],[1,"fas","fa-ellipsis-v"]],template:function(a,s){1&a&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h5",4),e._uU(5,"Contact List "),e.TgZ(6,"span",5),e._uU(7),e.qZA()()(),e.TgZ(8,"div",6)(9,"label",7),e._uU(10,"Items per page:"),e.qZA(),e.TgZ(11,"select",8),e.NdJ("ngModelChange",function(o){return s.itemsPerPage=o}),e.YNc(12,S,2,2,"option",9),e.qZA()()(),e.TgZ(13,"div",2)(14,"div",10)(15,"div")(16,"ul",11)(17,"li",12)(18,"a",13),e._UZ(19,"i",14),e.qZA()(),e.TgZ(20,"li",12)(21,"a",15),e._UZ(22,"i",16),e.qZA()()()(),e.TgZ(23,"div")(24,"a",17),e._UZ(25,"i",18),e._uU(26," Add New "),e.qZA()(),e.TgZ(27,"div",19)(28,"a",20),e._UZ(29,"i",21),e.qZA(),e.TgZ(30,"ul",22)(31,"li")(32,"a",23),e._uU(33,"Action"),e.qZA()(),e.TgZ(34,"li")(35,"a",23),e._uU(36,"Another action"),e.qZA()(),e.TgZ(37,"li")(38,"a",23),e._uU(39,"Something else here"),e.qZA()()()()()()(),e.TgZ(40,"div",24)(41,"div",25)(42,"div",26)(43,"div",26)(44,"table",27)(45,"thead")(46,"tr")(47,"th",28)(48,"div",29),e._UZ(49,"input",30)(50,"label",31),e.qZA()(),e.TgZ(51,"th",32),e._uU(52,"Name"),e.qZA(),e.TgZ(53,"th",32),e._uU(54,"Position"),e.qZA(),e.TgZ(55,"th",32),e._uU(56,"Email"),e.qZA(),e.TgZ(57,"th",33),e._uU(58,"Action"),e.qZA()()(),e.TgZ(59,"tbody"),e.YNc(60,j,32,8,"tr",34),e.ALo(61,"paginate"),e.qZA()()()()()(),e.TgZ(62,"div",35)(63,"div",36)(64,"div")(65,"p",37),e._uU(66),e.qZA()()(),e.TgZ(67,"div",36)(68,"div",38)(69,"pagination-controls",39),e.NdJ("pageChange",function(o){return s.currentPage=o}),e.qZA()()()()()),2&a&&(e.xp6(7),e.hij("(",s.users.length,")"),e.xp6(4),e.Q6J("ngModel",s.itemsPerPage),e.xp6(1),e.Q6J("ngForOf",s.itemsPerPageOptions),e.xp6(48),e.Q6J("ngForOf",e.xi3(61,7,s.users,e.WLB(10,z,s.itemsPerPage,s.currentPage))),e.xp6(6),e.lnq(" Showing ",(s.currentPage-1)*s.itemsPerPage+1," to ",s.currentPage*s.itemsPerPage<s.users.length?s.currentPage*s.itemsPerPage:s.users.length," of ",s.users.length," entries "))},dependencies:[u.mk,u.sg,B,m.YN,m.Kr,m.EJ,m.JJ,m.On,F],styles:["body[_ngcontent-%COMP%]{margin-top:20px;background-color:#eee}.project-list-table[_ngcontent-%COMP%]{border-collapse:separate;border-spacing:0 12px}.project-list-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{background-color:#fff}.table-nowrap[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table-nowrap[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{white-space:nowrap}.table-borderless[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not(caption) > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{border-bottom-width:0}.table[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not(caption) > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{padding:.75rem;background-color:var(--bs-table-bg);border-bottom-width:1px;box-shadow:inset 0 0 0 9999px var(--bs-table-accent-bg)}.avatar-sm[_ngcontent-%COMP%]{height:2rem;width:2rem}.rounded-circle[_ngcontent-%COMP%]{border-radius:50%!important}.me-2[_ngcontent-%COMP%]{margin-right:.5rem!important}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%]{vertical-align:middle}a[_ngcontent-%COMP%]{color:#3b76e1;text-decoration:none}.badge-soft-danger[_ngcontent-%COMP%]{color:#f56e6e!important;background-color:#f56e6e1a}.badge-soft-success[_ngcontent-%COMP%]{color:#63ad6f!important;background-color:#63ad6f1a}.badge-soft-primary[_ngcontent-%COMP%]{color:#3b76e1!important;background-color:#3b76e11a}.badge-soft-info[_ngcontent-%COMP%]{color:#57c9eb!important;background-color:#57c9eb1a}.avatar-title[_ngcontent-%COMP%]{align-items:center;background-color:#3b76e1;color:#fff;display:flex;font-weight:500;height:100%;justify-content:center;width:100%}.bg-soft-primary[_ngcontent-%COMP%]{background-color:#3b76e140!important}"]})}return n})();const Y=[{path:"",component:(()=>{class n{static#e=this.\u0275fac=function(a){return new(a||n)};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-account"]],decls:1,vars:0,template:function(a,s){1&a&&e._UZ(0,"app-list-account")},dependencies:[R]})}return n})()}];let Q=(()=>{class n{static#e=this.\u0275fac=function(a){return new(a||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[C.Bz.forChild(Y),C.Bz]})}return n})();var H=p(8308);let G=(()=>{class n{static#e=this.\u0275fac=function(a){return new(a||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[u.ez,Q,E,H.m]})}return n})()}}]);