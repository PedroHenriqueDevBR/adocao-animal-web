"use strict";(self.webpackChunkanimal_adoption_frontend=self.webpackChunkanimal_adoption_frontend||[]).push([[592],{5874:(d,o,s)=>{s.d(o,{v:()=>r});class r{constructor(){this.name="",this.state=0,this.animals=[]}toCreate(){return{name:this.name,state:this.state}}}},2103:(d,o,s)=>{s.d(o,{S:()=>r});class r{constructor(){this.name="",this.cities=[]}toCreate(){return{name:this.name}}}},2564:(d,o,s)=>{s.d(o,{B:()=>n});var r=s(3018),i=s(1841),a=s(5288);let n=(()=>{class e{constructor(t,u){this.http=t,this.storage=u,this.BASE_URL="/server"}loginUser(t){return this.http.post(`${this.BASE_URL}/user/login/`,t.toLogin())}registerUser(t){return this.http.post(`${this.BASE_URL}/user/register`,t.toRegister())}getLoggedPersonData(){return this.http.get(`${this.BASE_URL}/user/`,{headers:this.storage.getHeader()})}updateData(t){return this.http.put(`${this.BASE_URL}/user/`,t,{headers:this.storage.getHeader()})}updateLocation(t){return this.http.put(`${this.BASE_URL}/user/`,t,{headers:this.storage.getHeader()})}updateImage(t){return this.http.put(`${this.BASE_URL}/user/image/`,t,{headers:this.storage.getHeader()})}removeImage(){return this.http.delete(`${this.BASE_URL}/user/image/`,{headers:this.storage.getHeader()})}logout(){this.storage.logout()}allPersons(){return this.http.get(`${this.BASE_URL}/user/all/`,{headers:this.storage.getHeader()})}enableModerator(t){return this.http.put(`${this.BASE_URL}/user/${t.id}/moderator/enable`,{},{headers:this.storage.getHeader()})}disableModerator(t){return this.http.put(`${this.BASE_URL}/user/${t.id}/moderator/disable`,{},{headers:this.storage.getHeader()})}blockPerson(t){return this.http.put(`${this.BASE_URL}/user/${t.id}/block`,{},{headers:this.storage.getHeader()})}unlockPerson(t){return this.http.put(`${this.BASE_URL}/user/${t.id}/unlock`,{},{headers:this.storage.getHeader()})}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(i.eN),r.LFG(a.g))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},5288:(d,o,s)=>{s.d(o,{g:()=>i});var r=s(3018);let i=(()=>{class a{constructor(){this.JWT_KEY="jwt",this.PROFILE_DATA="profile-data",this.ADOPTION_REQUESTS="adoption-requests"}saveJWT(e){localStorage.setItem(this.JWT_KEY,e.access)}userIsLogged(){return null!=localStorage.getItem(this.JWT_KEY)}logout(){localStorage.removeItem(this.JWT_KEY),localStorage.removeItem(this.PROFILE_DATA)}getHeader(){return{Authorization:this.getJWTKey()}}getJWTKey(){return"Bearer "+localStorage.getItem(this.JWT_KEY)||0}saveLoggedData(e){localStorage.setItem(this.PROFILE_DATA,JSON.stringify({id:e.id,image:e.image,name:e.name,username:e.username,is_moderator:e.is_moderator,is_active:e.is_active,is_admin:e.is_admin}))}getLoggedPersonData(){const e=localStorage.getItem(this.PROFILE_DATA)||"{}";return JSON.parse(e)}saveAdoptionRequests(e){localStorage.setItem(this.ADOPTION_REQUESTS,JSON.stringify(e))}addAdoptionRequests(e){let h=this.getAdoptionRequests();h.push(e),this.saveAdoptionRequests(h)}getAdoptionRequests(){const e=localStorage.getItem(this.ADOPTION_REQUESTS)||"[]";return JSON.parse(e)}}return a.\u0275fac=function(e){return new(e||a)},a.\u0275prov=r.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()},1481:(d,o,s)=>{s.d(o,{a:()=>n});var r=s(3018),i=s(1841),a=s(5288);let n=(()=>{class e{constructor(t,u){this.http=t,this.storage=u,this.BASE_URL="/server"}getLocations(){return this.http.get(`${this.BASE_URL}/location/`)}getCities(){return this.http.get(`${this.BASE_URL}/location/cities`)}createState(t){return this.http.post(`${this.BASE_URL}/location/state`,t.toCreate(),{headers:this.storage.getHeader()})}modifyState(t){return this.http.put(`${this.BASE_URL}/location/state/${t.id}`,{name:t.name},{headers:this.storage.getHeader()})}deleteState(t){return this.http.delete(`${this.BASE_URL}/location/state/${t.id}`,{headers:this.storage.getHeader()})}createCity(t){return this.http.post(`${this.BASE_URL}/location/city`,t.toCreate(),{headers:this.storage.getHeader()})}modifyCity(t){return this.http.put(`${this.BASE_URL}/location/city/${t.id}`,{name:t.name,state:t.state},{headers:this.storage.getHeader()})}deleteCity(t){return this.http.delete(`${this.BASE_URL}/location/city/${t.id}`,{headers:this.storage.getHeader()})}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(i.eN),r.LFG(a.g))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);