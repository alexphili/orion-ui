<template>
	<div :class="item.wrapperClass">
		<component
			:is="setup.itemIs(item)"
			v-if="item"
			v-bind="setup.itemData(item)"
			@click.prevent="$emit('click-label', item)">
			<orion-icon
				v-if="item.icon || item.fontIcon"
				class="orion-nav-main__item-main-icon"
				v-bind="item"/>

			<slot
				name="prepend"
				v-bind="{ item }"/>

			<slot v-bind="{ item }">{{ item.label }}</slot>

			<slot
				name="append"
				v-bind="{ item }"/>

			<orion-icon
				v-if="(item.children && item.replace) || item.showCarret"
				class="icon--children-indicator"
				icon="chevron_big_right"/>

			<orion-icon
				v-if="item.children && !item.replace"
				class="icon--collapse"
				:icon="item?.expand ? `caret_down` : `caret_right`"/>
		</component>

		<div
			v-if="setup.itemsToDisplay.length"
			v-show="item?.expand"
			class="orion-nav-main-item__children">
			<orion-nav-main-item
				v-for="(subitem, i) in setup.itemsToDisplay"
				:key="`main_${i}_${setup.getUid()}`"
				:data-index="i"
				:item="subitem"
				@click.prevent="setup.handleClick(subitem)"
				@touchstart.prevent="setup.handleClick(subitem)">
				<template #prepend>
					<slot
						name="prepend"
						v-bind="{ item: subitem }"/>
				</template>
				<template #default>
					<slot v-bind="{ item: subitem }">{{ subitem.label }}</slot>
				</template>
				<template #append>
					<slot
						name="append"
						v-bind="{ item: subitem }"/>
				</template>
			</orion-nav-main-item>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionNavMainItem.less';
import { OrionIcon } from 'packages/Icon';
import OrionNavMainItemSetupService from './OrionNavMainItemSetupService';
defineEmits<{(e: 'click-label', val: Orion.NavItem): void}>();
const props = defineProps(OrionNavMainItemSetupService.props);
const setup = new OrionNavMainItemSetupService(props);
defineExpose(setup.publicInstance);
</script>
