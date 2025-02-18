import type { VConsoleStorageOptions } from '../core/options.interface';
import { CookieStorage } from './storage.cookie';
import { WxStorage, isWxEnv } from './storage.wx';
import { VConsoleModel } from '../lib/model';

interface IStorageItem {
  name: string;
  storage: Storage;
}
export class VConsoleStorageModel extends VConsoleModel {
  public defaultStorages: VConsoleStorageOptions['defaultStorages'] = ['cookies', 'localStorage', 'sessionStorage'];
  protected cookiesStorage: CookieStorage;
  protected wxStorage: WxStorage;
  protected storages: IStorageItem[];

  /**
   * Get the singleton of storage list.
   */
  public getAllStorages() {
    if (!this.storages) {
      this.updateEnabledStorages();
    }
    return this.storages;
  }

  public updateEnabledStorages() {
    this.storages = [];
    if (document.cookie !== undefined && this.defaultStorages.indexOf('cookies') > -1) {
      if (!this.cookiesStorage) {
        this.cookiesStorage = new CookieStorage();
      }
      this.storages.push({ name: 'cookies', storage: this.cookiesStorage });
    }
    if (window.localStorage && this.defaultStorages.indexOf('localStorage') > -1) {
      this.storages.push({ name: 'localStorage', storage: localStorage });
    }
    if (window.sessionStorage && this.defaultStorages.indexOf('sessionStorage') > -1) {
      this.storages.push({ name: 'sessionStorage', storage: sessionStorage });
    }
    if (isWxEnv() && this.defaultStorages.indexOf('wxStorage') > -1) {
      if (!this.wxStorage) {
        this.wxStorage = new WxStorage();
      }
      this.storages.push({ name: 'wxStorage', storage: this.wxStorage });
    }
  }
}
