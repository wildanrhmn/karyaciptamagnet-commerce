declare module "react-use-keypress";

declare module 'midtrans-client' {
    export class CoreApi {
      constructor(options: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
      transaction: {
        notification(notificationJson: any): Promise<any>;
      };
    }
  
    export class Snap {
      constructor(options: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
      createTransaction(parameter: any): Promise<any>;
    }
  
    export class Iris {}
  
    export class MidtransError extends Error {} 
  }