import { Modules } from "@medusajs/framework/utils"
import {
  SubscriberArgs,
  type SubscriberConfig,
} from "@medusajs/medusa"

export default async function userCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationModuleService = container.resolve(
    Modules.NOTIFICATION
  )
  const userModule = container.resolve(
    Modules.USER
  )

  const user = await userModule.retrieveUser(data.id)

  await notificationModuleService.createNotifications({
    to: user.email,
    channel: "email",
    template: "product_created"
  })
}

export const config: SubscriberConfig = {
  event: "user.created",
}