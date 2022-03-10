<template>
  <div class="w-56 text-right fixed right-0 mr-10">
    <Menu as="div" class="relative inline-block text-left">
      <div>

		<!-- <button @click="keplrSuggestChain" class="px-4 opacity-75 float-left py-2 text-sm font-medium leading-5 text-center text-gray-50 transition-colors duration-200 transform bg-orange-600 rounded-md md:w-auto no-underline desktop:ml-28 half:text-md half:font-normal half:px-4 half:py-4 half:-my-5 xl:py-2 xl:text-lg" :class="walletAddress ? 'max-w-xs truncate' : ''"> -->
		<!-- 	{{!walletAddress ? "Connect Keplr" : walletAddress}} -->
		<!-- </button> -->
        <MenuButton
          class="
		  inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-400 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Connect Keplr
          <ChevronDownIcon
            class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                Disconnect
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
</script>

