export default class UserInfo {
  constructor({name, profession}) {
    this.name = name;
    this.profession = profession;
  }

  getUserInfo() {
    const profileData = {
      name: this.name.innerText,
      profession: this.profession.innerText,
    }
    return profileData;
  }

  setUserInfo(profileData) {
    this.name.textContent = profileData.name;
    this.profession.textContent = profileData.profession;
  }
}