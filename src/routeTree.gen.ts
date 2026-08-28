/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as HoteleRouteImport } from './routes/hotele'
import { Route as KontoRouteImport } from './routes/konto'
import { Route as KoszykRouteImport } from './routes/koszyk'
import { Route as NieruchomosciRouteImport } from './routes/nieruchomosci'
import { Route as PanelRouteImport } from './routes/panel'
import { Route as PayuDemoRouteImport } from './routes/payu-demo'
import { Route as PrywatnoscRouteImport } from './routes/prywatnosc'
import { Route as RestauracjeRouteImport } from './routes/restauracje'
import { Route as SamochodyRouteImport } from './routes/samochody'
import { Route as SklepRouteImport } from './routes/sklep'
import { Route as WspolpracaRouteImport } from './routes/wspolpraca'
import { Route as WycieczkiRouteImport } from './routes/wycieczki'
import { Route as HoteleIdRouteImport } from './routes/hotele.$id'
import { Route as RezerwacjaIdRouteImport } from './routes/rezerwacja.$id'
import { Route as ApiPayuNotifyRouteImport } from './routes/api/payu.notify'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const HoteleRoute = HoteleRouteImport.update({ id: '/hotele', path: '/hotele', getParentRoute: () => rootRouteImport } as any)
const KontoRoute = KontoRouteImport.update({ id: '/konto', path: '/konto', getParentRoute: () => rootRouteImport } as any)
const KoszykRoute = KoszykRouteImport.update({ id: '/koszyk', path: '/koszyk', getParentRoute: () => rootRouteImport } as any)
const NieruchomosciRoute = NieruchomosciRouteImport.update({ id: '/nieruchomosci', path: '/nieruchomosci', getParentRoute: () => rootRouteImport } as any)
const PanelRoute = PanelRouteImport.update({ id: '/panel', path: '/panel', getParentRoute: () => rootRouteImport } as any)
const PayuDemoRoute = PayuDemoRouteImport.update({ id: '/payu-demo', path: '/payu-demo', getParentRoute: () => rootRouteImport } as any)
const PrywatnoscRoute = PrywatnoscRouteImport.update({ id: '/prywatnosc', path: '/prywatnosc', getParentRoute: () => rootRouteImport } as any)
const RestauracjeRoute = RestauracjeRouteImport.update({ id: '/restauracje', path: '/restauracje', getParentRoute: () => rootRouteImport } as any)
const SamochodyRoute = SamochodyRouteImport.update({ id: '/samochody', path: '/samochody', getParentRoute: () => rootRouteImport } as any)
const SklepRoute = SklepRouteImport.update({ id: '/sklep', path: '/sklep', getParentRoute: () => rootRouteImport } as any)
const WspolpracaRoute = WspolpracaRouteImport.update({ id: '/wspolpraca', path: '/wspolpraca', getParentRoute: () => rootRouteImport } as any)
const WycieczkiRoute = WycieczkiRouteImport.update({ id: '/wycieczki', path: '/wycieczki', getParentRoute: () => rootRouteImport } as any)
const HoteleIdRoute = HoteleIdRouteImport.update({ id: '/$id', path: '/$id', getParentRoute: () => HoteleRoute } as any)
const RezerwacjaIdRoute = RezerwacjaIdRouteImport.update({ id: '/rezerwacja/$id', path: '/rezerwacja/$id', getParentRoute: () => rootRouteImport } as any)
const ApiPayuNotifyRoute = ApiPayuNotifyRouteImport.update({ id: '/api/payu/notify', path: '/api/payu/notify', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/hotele': typeof HoteleRouteWithChildren
  '/konto': typeof KontoRoute
  '/koszyk': typeof KoszykRoute
  '/nieruchomosci': typeof NieruchomosciRoute
  '/panel': typeof PanelRoute
  '/payu-demo': typeof PayuDemoRoute
  '/prywatnosc': typeof PrywatnoscRoute
  '/restauracje': typeof RestauracjeRoute
  '/samochody': typeof SamochodyRoute
  '/sklep': typeof SklepRoute
  '/wspolpraca': typeof WspolpracaRoute
  '/wycieczki': typeof WycieczkiRoute
  '/hotele/$id': typeof HoteleIdRoute
  '/rezerwacja/$id': typeof RezerwacjaIdRoute
  '/api/payu/notify': typeof ApiPayuNotifyRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/hotele': typeof HoteleRouteWithChildren
  '/konto': typeof KontoRoute
  '/koszyk': typeof KoszykRoute
  '/nieruchomosci': typeof NieruchomosciRoute
  '/panel': typeof PanelRoute
  '/payu-demo': typeof PayuDemoRoute
  '/prywatnosc': typeof PrywatnoscRoute
  '/restauracje': typeof RestauracjeRoute
  '/samochody': typeof SamochodyRoute
  '/sklep': typeof SklepRoute
  '/wspolpraca': typeof WspolpracaRoute
  '/wycieczki': typeof WycieczkiRoute
  '/hotele/$id': typeof HoteleIdRoute
  '/rezerwacja/$id': typeof RezerwacjaIdRoute
  '/api/payu/notify': typeof ApiPayuNotifyRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/hotele': typeof HoteleRouteWithChildren
  '/konto': typeof KontoRoute
  '/koszyk': typeof KoszykRoute
  '/nieruchomosci': typeof NieruchomosciRoute
  '/panel': typeof PanelRoute
  '/payu-demo': typeof PayuDemoRoute
  '/prywatnosc': typeof PrywatnoscRoute
  '/restauracje': typeof RestauracjeRoute
  '/samochody': typeof SamochodyRoute
  '/sklep': typeof SklepRoute
  '/wspolpraca': typeof WspolpracaRoute
  '/wycieczki': typeof WycieczkiRoute
  '/hotele/$id': typeof HoteleIdRoute
  '/rezerwacja/$id': typeof RezerwacjaIdRoute
  '/api/payu/notify': typeof ApiPayuNotifyRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/hotele' | '/konto' | '/koszyk' | '/nieruchomosci' | '/panel' | '/payu-demo' | '/prywatnosc' | '/restauracje' | '/samochody' | '/sklep' | '/wspolpraca' | '/wycieczki' | '/hotele/$id' | '/rezerwacja/$id' | '/api/payu/notify'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/hotele' | '/konto' | '/koszyk' | '/nieruchomosci' | '/panel' | '/payu-demo' | '/prywatnosc' | '/restauracje' | '/samochody' | '/sklep' | '/wspolpraca' | '/wycieczki' | '/hotele/$id' | '/rezerwacja/$id' | '/api/payu/notify'
  id: '__root__' | '/' | '/hotele' | '/konto' | '/koszyk' | '/nieruchomosci' | '/panel' | '/payu-demo' | '/prywatnosc' | '/restauracje' | '/samochody' | '/sklep' | '/wspolpraca' | '/wycieczki' | '/hotele/$id' | '/rezerwacja/$id' | '/api/payu/notify'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  HoteleRoute: typeof HoteleRouteWithChildren
  KontoRoute: typeof KontoRoute
  KoszykRoute: typeof KoszykRoute
  NieruchomosciRoute: typeof NieruchomosciRoute
  PanelRoute: typeof PanelRoute
  PayuDemoRoute: typeof PayuDemoRoute
  PrywatnoscRoute: typeof PrywatnoscRoute
  RestauracjeRoute: typeof RestauracjeRoute
  SamochodyRoute: typeof SamochodyRoute
  SklepRoute: typeof SklepRoute
  WspolpracaRoute: typeof WspolpracaRoute
  WycieczkiRoute: typeof WycieczkiRoute
  RezerwacjaIdRoute: typeof RezerwacjaIdRoute
  ApiPayuNotifyRoute: typeof ApiPayuNotifyRoute
}
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/hotele': { id: '/hotele'; path: '/hotele'; fullPath: '/hotele'; preLoaderRoute: typeof HoteleRouteImport; parentRoute: typeof rootRouteImport }
    '/konto': { id: '/konto'; path: '/konto'; fullPath: '/konto'; preLoaderRoute: typeof KontoRouteImport; parentRoute: typeof rootRouteImport }
    '/koszyk': { id: '/koszyk'; path: '/koszyk'; fullPath: '/koszyk'; preLoaderRoute: typeof KoszykRouteImport; parentRoute: typeof rootRouteImport }
    '/nieruchomosci': { id: '/nieruchomosci'; path: '/nieruchomosci'; fullPath: '/nieruchomosci'; preLoaderRoute: typeof NieruchomosciRouteImport; parentRoute: typeof rootRouteImport }
    '/panel': { id: '/panel'; path: '/panel'; fullPath: '/panel'; preLoaderRoute: typeof PanelRouteImport; parentRoute: typeof rootRouteImport }
    '/payu-demo': { id: '/payu-demo'; path: '/payu-demo'; fullPath: '/payu-demo'; preLoaderRoute: typeof PayuDemoRouteImport; parentRoute: typeof rootRouteImport }
    '/prywatnosc': { id: '/prywatnosc'; path: '/prywatnosc'; fullPath: '/prywatnosc'; preLoaderRoute: typeof PrywatnoscRouteImport; parentRoute: typeof rootRouteImport }
    '/restauracje': { id: '/restauracje'; path: '/restauracje'; fullPath: '/restauracje'; preLoaderRoute: typeof RestauracjeRouteImport; parentRoute: typeof rootRouteImport }
    '/samochody': { id: '/samochody'; path: '/samochody'; fullPath: '/samochody'; preLoaderRoute: typeof SamochodyRouteImport; parentRoute: typeof rootRouteImport }
    '/sklep': { id: '/sklep'; path: '/sklep'; fullPath: '/sklep'; preLoaderRoute: typeof SklepRouteImport; parentRoute: typeof rootRouteImport }
    '/wspolpraca': { id: '/wspolpraca'; path: '/wspolpraca'; fullPath: '/wspolpraca'; preLoaderRoute: typeof WspolpracaRouteImport; parentRoute: typeof rootRouteImport }
    '/wycieczki': { id: '/wycieczki'; path: '/wycieczki'; fullPath: '/wycieczki'; preLoaderRoute: typeof WycieczkiRouteImport; parentRoute: typeof rootRouteImport }
    '/hotele/$id': { id: '/hotele/$id'; path: '/$id'; fullPath: '/hotele/$id'; preLoaderRoute: typeof HoteleIdRouteImport; parentRoute: typeof HoteleRoute }
    '/rezerwacja/$id': { id: '/rezerwacja/$id'; path: '/rezerwacja/$id'; fullPath: '/rezerwacja/$id'; preLoaderRoute: typeof RezerwacjaIdRouteImport; parentRoute: typeof rootRouteImport }
    '/api/payu/notify': { id: '/api/payu/notify'; path: '/api/payu/notify'; fullPath: '/api/payu/notify'; preLoaderRoute: typeof ApiPayuNotifyRouteImport; parentRoute: typeof rootRouteImport }
  }
}
interface HoteleRouteChildren { HoteleIdRoute: typeof HoteleIdRoute }
const HoteleRouteChildren: HoteleRouteChildren = { HoteleIdRoute: HoteleIdRoute }
const HoteleRouteWithChildren = HoteleRoute._addFileChildren(HoteleRouteChildren)
const rootRouteChildren: RootRouteChildren = {
  IndexRoute, HoteleRoute: HoteleRouteWithChildren, KontoRoute, KoszykRoute, NieruchomosciRoute,
  PanelRoute, PayuDemoRoute, PrywatnoscRoute, RestauracjeRoute, SamochodyRoute, SklepRoute,
  WspolpracaRoute, WycieczkiRoute, RezerwacjaIdRoute, ApiPayuNotifyRoute,
}
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
