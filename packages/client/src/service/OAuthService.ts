import { REDIRECT_URI_DEV, REDIRECT_URI_PROD } from '@/common/consts/consts';
import { AxiosService } from './AxiosService';
import { ApiEndpoint } from './types/api/enums/ApiEndpoint';

class OAuthService extends AxiosService {
  public constructor() {
    super();
  }

  public async getServiceId(): Promise<{ service_id: string }> {
    return this.get(ApiEndpoint.GET_SERVICE_ID, {
      params: { redirect_uri: process.env.NODE_ENV === 'development' ? REDIRECT_URI_DEV : REDIRECT_URI_PROD },
    });
  }

  public async signInYandex(code: string, redirect_uri: string) {
    return this.post(ApiEndpoint.OAUTH_YANDEX, {
      code,
      redirect_uri,
    });
  }
}

export const oAuthService = new OAuthService();
