export default function NotificationsPage() {
  return (
    <div class="space-y-6">
      <div>
        <h1 class="my-0 mb-2 text-2xl font-semibold tracking-tight text-foreground">
          通知
        </h1>
        <p class="mt-1 text-sm text-muted-foreground">
          お知らせとアラートの一覧をここに表示します。
        </p>
      </div>
      <div class="rounded-xl border bg-card text-card-foreground shadow">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="font-semibold leading-none tracking-tight">通知一覧</h3>
          <p class="text-sm text-muted-foreground">
            接続先の API が整い次第、ここに通知リストを表示します。
          </p>
        </div>
      </div>
    </div>
  )
}
