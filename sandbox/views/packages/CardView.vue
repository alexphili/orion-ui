<template>
	<o-page title="Card">
		<o-section align="left">
			<o-checkbox
				v-model="state.headerLine"
				label="headerLine"/>
			<o-checkbox
				v-model="state.actionsLine"
				label="actionsLine"/>
		</o-section>

		<o-section
			size="xs"
			align="left">
			<o-radio
				v-for="(size, index) in sizes"
				:key="index"
				v-model="state.size"
				:input-value="size"
				:label="size"/>
		</o-section>

		<o-section>
			<div class="row row--grid">
				<div
					v-for="(color, index) in colors"
					:key="index"
					class="col-sm-6 col-lg-3">
					<o-card
						:gradient="color"
						selected
						:selected-color="color"
						:title="color"
						v-bind="state">
						<pre style="color:black">{{ color }}</pre>
						Etiam porta sem malesuada magna mollis euismod.
					</o-card>
				</div>
			</div>
		</o-section>

		<o-section>
			<o-card
				ref="theOne"
				style="width: 300px;"
				:selected="state.selected"
				title="Euismod Aenean Egestas"
				@click="notify()">
				Etiam porta sem malesuada magna mollis euismod.

				<template #actions>
					<o-icon
						icon="check"
						@click="state.selected = !state.selected"/>
					<o-icon
						icon="Sketch"
						:loading="state.selected"/>
				</template>
			</o-card>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { colors, sizes, useNotif } from 'lib';
import { reactive, ref } from 'vue';

const theOne = ref<OrionCard>();

const state = reactive({
	size: 'md' as Orion.Size,
	headerLine: false,
	actionsLine: false,
	selected: false,
});

function notify () {
	console.log(theOne.value);
	console.log(theOne.value?._el());

	useNotif.info('dsmldkj');
}
</script>
