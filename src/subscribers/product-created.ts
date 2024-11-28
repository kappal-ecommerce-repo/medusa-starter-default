import type {
    SubscriberArgs,
    SubscriberConfig,
  } from "@medusajs/framework"
  import { Modules } from "@medusajs/framework/utils"
  import { INotificationModuleService } from "@medusajs/framework/types"
  
  export default async function productCreateHandler({
    event: { data },
    container,
  }: SubscriberArgs<{ id: string }>) {
    const notificationModuleService: INotificationModuleService =
      container.resolve(Modules.NOTIFICATION)
  
    await notificationModuleService.createNotifications({
        to: "rjkani@gmail.com",
        template: "d-e77c75f85a964a6d9da87f67bef7aed4",
        channel: "email",
    })
  }
  
  export const config: SubscriberConfig = {
    event: "product.created",
  }