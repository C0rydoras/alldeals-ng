import { For, createResource, Show } from 'solid-js';
import Fa from 'solid-fa';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const fetchDeals = async () => {
    const resp = await fetch('https://deals.gk.wtf/api.php');
    return resp.json();
};

function Bar() {
    return (
        <nav class="h-30 w-full px-2 pt-3 pb-2 bg-white shadow-lg">
            <ul class="w-full flex text-3xl">
                <li class="font-bold w-full px-3">
                    <a href="/">AllDeals</a>
                </li>
                <li class="px-3 whitespace-nowrap">
                    <a href="https://github.com/c0rydoras/alldeals-ng.git">
                        <Fa icon={faGithub} />
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
                    <a href="https://github.com/C0rydoras/alldeals-ng/blob/main/LICENSE">
                        LICENSE
                    </a>
                </li>
                <li class="text-lg text-slate-300 whitespace-nowrap px-5">
                    frontend by{' '}
                    <a href="https://github.com/c0rydoras">@c0rydoras</a>
                </li>
            </ul>
        </div>
    );
}

function Deal(props) {
    //const availability = props.deal.availability;
    const availability = '0%';
    const color = props.deal.color;
    return (
        <a
            id={props.id}
            href={props.deal.url}
            target="_blank"
            class={`relative bg-white flex flex-col shadow-lg p-6 hover:shadow-xl hover: [box-shadow] duration-300 text-slate-700 rounded-lg ${
                availability === '0%' ? 'grayscale' : ''
            }`}
        >
            <div class="flex justify-between">
                <div class="flex flex-col mr-2">
                    <span class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
                        {props.deal.title}
                    </span>
                    <span class="h-20 text-slate-500 text-2xs sm:text-xs md:text-md lg:text-lg">
                        {props.deal.subtitle}
                    </span>
                </div>
                <img
                    class="h-[32px] lg:h-[48px] rounded aspect-square"
                    src={`https://www.google.com/s2/favicons?${new URLSearchParams(
                        {
                            domain: props.deal.url,
                            sz: 256,
                        },
                    )}`}
                />
            </div>
            <div class="w-full h-60 rounded grid place-items-center h-full">
                <img
                    class="max-h-50 max-w-[50%] object-scale-down mb-4"
                    src={props.deal.image}
                    alt={props.id}
                />
            </div>

            <div class="flex justify-between items-end">
                <div class="flex justify-between">
                    <div class="flex flex-col">
                        <strong class="text-2xl whitespace-nowrap">
                            CHF {props.deal.new_price}
                        </strong>
                        <p class="text-xl line-through whitespace-nowrap ">
                            CHF {props.deal.old_price}
                        </p>
                    </div>
                </div>
                <p style={`color: ${color}`} class="pr-2 drop-shadow-lg">
                    {props.deal.subcategory}
                </p>
            </div>
            <div
                class={`rounded-lg mt-3 text-slate-700 shadow-lg relative border-2`}
                style={`border-color: ${color}`}
            >
                <div
                    style={`width: ${availability}; background: ${color}`}
                    class="w-full text-center block h-6 rounded-l-md"
                />
                <strong
                    class="absolute top-0 left-[50%] drop-shadow-sm"
                    style={`color: color-mix(in oklab, ${color}, white)`}
                >
                    {props.deal.availability}
                </strong>
            </div>
        </a>
    );
}
function Deals() {
    const [deals] = createResource(fetchDeals);

    return (
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-16 p-5 md:p-10">
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
