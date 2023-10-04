import { For, createResource, Show } from "solid-js";

const fetchDeals = async () => {
  const resp = await fetch("https://deals.gk.wtf/api.php");
  return resp.json();
};


function Bar() {
  return (
    <nav class="h-30 w-full px-2 py-3 bg-white shadow-lg">
      <ul class="w-full flex">
        <li class="font-bold text-3xl w-full px-3">
          <a href="/">AllDeals</a>
        </li>
        <li class="text-2xl px-3 whitespace-nowrap">
          <a
            href="https://github.com/c0rydoras/alldeals-ng.git"
          >
            Github Repo
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <div class="h-30 w-full px-2 py-3 bg-white shadow-xl ">
      <ul class="w-full flex">
        <li class="px-5 text-xl w-full text-slate-400">
          <a
            href="https://github.com/C0rydoras/alldeals-ng/blob/main/LICENSE"
          >
            LICENSE
          </a>
        </li>
        <li class="text-lg text-slate-300 whitespace-nowrap px-5">
          frontend by{" "}
          <a href="https://github.com/c0rydoras">
            @c0rydoras
          </a>
        </li>
      </ul>
    </div>
  );
}

function Deal({ id, deal }) {
  const availability = deal.availability;
  const color = deal.color;
  return (
    <a
      id={id}
      href={deal.url}
      target="_blank"
      class="bg-white flex flex-col shadow-lg p-6 hover:shadow-xl transition-[box-shadow] duration-300 text-slate-700 rounded-lg"
    >
      <div class="flex justify-between">
        <div class="flex flex-col mr-2">
          <span
            class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold"
          >
            {deal.title}
          </span>
          <span class="h-20 text-slate-500 text-2xs sm:text-xs md:text-md lg:text-lg">
            {deal.subtitle}
          </span>
        </div>
        <img class="h-[32px] lg:h-[64px] rounded aspect-square" src={`https://www.google.com/s2/favicons?${new URLSearchParams({ domain: deal.url, sz: 256 })}`} />
      </div>
      <div class="w-full h-60 rounded grid place-items-center h-full w-full">
        <img class="max-h-60 max-w-[50%] object-scale-down" src={deal.image} alt={id} />
      </div>


      <div class="flex justify-between items-end">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <strong class="text-2xl whitespace-nowrap">CHF {deal.new_price}</strong>
            <p class="text-xl line-through whitespace-nowrap ">
              CHF {deal.old_price}
            </p>
          </div>
        </div>
        <p>{id}</p>
      </div>
      <div
        class={`rounded-lg mt-3 text-slate-700 shadow-lg relative border-4`}
        style={`border-color: ${color}`}
      >
        <div
          style={`width: ${availability}; background: ${color}`}
          class="w-full text-center block h-6"
        />
        <strong class="absolute top-0 left-[50%]" style={`color: color-mix(in oklab, ${color}, white)`}>
          {deal.availability}
        </strong>
      </div>
    </a>
  );
}
function Deals() {
  const [deals] = createResource(fetchDeals);

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 gap-10 p-10">
      <Show fallback={<p>...loading</p>} when={deals()}>
        <For each={Object.entries(deals())}>
          {(deal) => <Deal id={deal[0]} deal={deal[1]} />}
        </For>
      </Show>
    </div>
  );
}

function App() {
  return (
    <>
      <header class="sticky top-0 z-40">
        <Bar />
      </header>
      <main>
        <Deals />
      </main>
      <footer class="sticky top-[100%]">
        <Footer />
      </footer>
    </>
  );
}

export default App;
