import { ref } from 'vue';

export function useModalLinks() {
  const isModalOpen = ref(false);
  const modalContentId = ref("");

  const openModal = (uuid) => {
    modalContentId.value = uuid;
    isModalOpen.value = true;
    // You might want to emit an event or call a global store action here
    // to signal other parts of your app that a modal should open.
    console.log('Opening modal with ID:', uuid);
  };

  const closeModal = () => {
    isModalOpen.value = false;
    modalContentId.value = "";
  };

  // This function transforms the HTML string
  const convertLinksForModal = (htmlString) => {
    return htmlString.replace(
      /<a\s+href="([^"]*)"([^>]*)>/g,
      (match, href, otherAttributes) => {
        // Extract UUID from href (remove http:// prefix if present)
        const uuid = href.replace(/^https?:\/\//, "");

      // Validate UUID format (basic check)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      
      if (uuidRegex.test(uuid)) {
        // Convert to span with click handler and data attribute
        return `<span class="modal-link" style="cursor: pointer; text-decoration: underline;" data-modal-id="${uuid}"${otherAttributes}>`;
      } else {
        // Keep as regular link if not a valid UUID
        return match;
      }
    }).replace(/<\/a>/g, '</span>');
  }

  return {
    isModalOpen,
    modalContentId,
    openModal,
    closeModal,
    convertLinksForModal,
  };
}