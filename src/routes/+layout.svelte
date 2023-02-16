<script lang="ts">
	import { invalidateAll } from "$app/navigation";
    import "modern-normalize/modern-normalize.css"
	import { LogoutButton } from "$components";
    import '../styles/main.scss';
	import type { LayoutData } from "./$types";

    export let data: LayoutData

    $: user = data.user;
</script> 

{#if user}
    <p>Hello {user.display_name}</p>
    <LogoutButton />
{/if}

<slot />