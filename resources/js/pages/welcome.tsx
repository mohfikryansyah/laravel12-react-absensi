import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                {/* <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header> */}

                <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
                    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="image/logo_bonbol.png" className="h-10" alt="Flowbite Logo" />
                        </a>
                        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                            <button
                                data-collapse-toggle="navbar-sticky"
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-sticky"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
                            <ul className="mt-4 ml-10 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                                <li>
                                    <a
                                        href="#"
                                        className="block rounded-sm bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                                        aria-current="page"
                                    >
                                        Dinas Penanaman Modasl dan Pelayanan Terpadu Satu Pintu
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div id="landing" className="mx-auto min-h-[68rem] max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8">
                    <h1
                        className="font-inter mt-24 text-center text-5xl font-bold text-gray-800 md:text-6xl lg:text-7xl"
                        data-aos="fade-down"
                        data-aos-duration="3000"
                    >
                        Cepat. Tepat. Tuntas.
                    </h1>
                    <div className="mx-auto max-w-[40rem]">
                        <p data-aos="fade-up" data-aos-duration="3000" className="mt-4 text-center text-xl text-gray-400">
                            Kami hadir dengan pelayanan yang cepat, tepat, dan tuntas untuk mendukung kemudahan investasi dan perizinan bagi
                            masyarakat.
                        </p>
                    </div>
                    <div className="mt-40 grid justify-center gap-x-5 gap-y-5 md:grid-cols-3 md:gap-y-0">
                        <div
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="customboxshadow relative order-2 h-80 w-96 overflow-hidden bg-gradient-to-b from-[#fbfdfe] to-[#eff5f6] transition duration-300 hover:scale-105 md:order-1"
                        >
                            <div className="h-full p-10">
                                <div className="max-w-max rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-gray-50">Total Pengguna</div>
                                <div className="mt-3 text-6xl font-semibold">30+</div>
                                <div className="mt-3 text-base text-gray-400">dengan</div>
                                <div className="absolute z-[10] text-lg text-gray-800">10.000+ kehadiran tercatat</div>
                                <div className="absolute bottom-0 h-[10rem] w-[30rem] -rotate-45 bg-gray-300"></div>
                                <div className="absolute bottom-10 h-[10rem] w-[30rem] -rotate-45 bg-gray-200"></div>
                            </div>
                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="customboxshadow relative order-1 h-96 w-96 overflow-hidden bg-gradient-to-b from-[#fbfdfe] to-[#eff5f6] transition duration-300 hover:scale-105 md:order-2"
                        >
                            <h2 className="absolute top-[2.5rem] left-1/2 -translate-x-1/2 transform text-lg font-medium tracking-wide">
                                For Android
                            </h2>
                            <img
                                src="image/Clock_In.png"
                                className="absolute top-[5.6rem] right-1/2 z-[11] h-auto max-w-[15rem] transform text-lg"
                                alt=""
                            />
                            <img
                                src="image/Clock_InOut.png"
                                className="absolute top-[2rem] left-1/2 h-auto max-w-[15rem] -translate-x-1/2 transform text-lg"
                                alt=""
                            />
                            <img
                                src="image/Clock_Out.png"
                                className="absolute top-[6rem] left-1/2 z-[11] h-auto max-w-[15rem] transform text-lg"
                                alt=""
                            />
                            <div className="absolute -bottom-[35rem] left-1/2 z-[10] h-[50rem] w-[50rem] -translate-x-1/2 transform rounded-full border-2 border-gray-300/20 bg-gray-100/80"></div>
                            <div className="absolute -bottom-[38rem] left-1/2 z-[12] h-[50rem] w-[50rem] -translate-x-1/2 transform rounded-full border-2 border-gray-300/20 bg-gray-200/70"></div>
                            <div className="absolute -bottom-[41rem] left-1/2 z-[14] h-[50rem] w-[50rem] -translate-x-1/2 transform rounded-full border-2 border-gray-300/20 bg-gray-300/60"></div>
                            <a
                                href="aplikasi-mobile/absensi.apk"
                                className="absolute bottom-8 left-1/2 z-[15] inline-flex -translate-x-1/2 transform items-center gap-x-2 rounded-full border border-transparent bg-[#3b5766] px-4 py-4 text-sm font-medium text-white hover:bg-[#334b58] focus:bg-[#3b5766] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                                <i className="fa-solid fa-cloud-arrow-down text-xl"></i>
                                <div>
                                    <p className="text-sm text-gray-400">Download</p>
                                    <p className="text-sm">Aplikasi Absensi</p>
                                </div>
                            </a>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="customboxshadow order-3 h-80 w-96 bg-gradient-to-b from-[#fbfdfe] to-[#eff5f6] transition duration-300 hover:scale-105"
                        >
                            <div className="relative h-full p-4">
                                <div className="absolute z-[20] mt-6 ml-6 max-w-max rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-gray-50">
                                    Fitur
                                </div>
                                <div className="absolute right-6 z-[10] mt-[4rem] rounded-xl border-2 border-gray-200/30 bg-[#e6edf0] px-4 pt-10 pb-3 text-gray-600">
                                    Export Rekapan Kehadiran
                                </div>
                                <div className="absolute right-[2.5rem] z-[9] mt-[7.5rem] rounded-xl border-2 border-gray-200/30 bg-[#e6edf0]/50 px-4 pt-10 pb-3 text-gray-600">
                                    Laporan Kehadiran Real-Time
                                </div>
                                <div className="absolute right-[3.5rem] z-[8] mt-[11rem] rounded-xl border-2 border-gray-200/30 bg-[#e6edf0]/30 px-4 pt-10 pb-3 text-gray-600">
                                    Absensi dengan Lokasi & Swafoto
                                </div>
                                <div className="relative flex h-[11rem] w-[11rem] items-center justify-center rounded-full border-2 border-gray-300/20 bg-white/20">
                                    <div className="relative flex h-[9rem] w-[9rem] items-center justify-center rounded-full border-2 border-gray-300/20 bg-white/40">
                                        <div className="relative flex h-[7rem] w-[7rem] items-center justify-center rounded-full border-2 border-gray-300/20 bg-gray-50/60"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
