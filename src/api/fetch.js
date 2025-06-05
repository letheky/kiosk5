import axios from "axios";
// import { getShortestPath, extractText } from "../utils/utils";
import {
  GET_ALL_KIOSK,
  GET_PAGE_FOLDER_DETAIL_BY_ID,
  GET_ARTICLE_TOPIC,
  GET_ALL_PERSON_GROUP,
  GET_PERSON_GROUP_BY_ID,
  GET_IMAGE_LIST_BY_ID,
  GET_DOCUMENT_LIST_BY_ID,
  GET_PERSON_BY_ID,
  GET_POSITION_LIST_BY_ID,
  GET_TOUR_LIST_BY_ID,
  GET_AUDIO_LIST_BY_ID,
  GET_VIDEO_LIST_BY_ID,
  GET_ARTICLE_BY_ID,
} from "@/api/const";

export const fetchIntroduceArticle = async (store) => {
  try {
    const kioskRes = await axios.get(store.api + GET_ALL_KIOSK);
    const pageFolderId = kioskRes.data.results[4].page_folder;
    const pageFolderRes = await axios.get(
      store.api + GET_PAGE_FOLDER_DETAIL_BY_ID + pageFolderId + "/"
    );
    const introduceTopicId = pageFolderRes.data.page_list[0].article_topic[0];
    const articleTopicRes = await axios.get(
      store.api + GET_ARTICLE_TOPIC + introduceTopicId + "/"
    );
    const introduceArticle = articleTopicRes.data.article_list[0];
    const audioLink = await fetchPersonAudio(store, introduceArticle.audio_folder[0]);
    return {
      ...introduceArticle,
      audioLink,
    };
  } catch (error) {
    console.error("Unexpected error fetching markers:", error);
  }
};

export const fetchArticleById = async (store, articleId) => {
  try {
    const articleRes = await axios.get(store.api + GET_ARTICLE_BY_ID + articleId + "/");
    return articleRes.data;
  } catch (error) {
    console.error("Unexpected error fetching article:", error);
  }
};
export const fetchPersonInfo = async (store, personStore) => {
  try {
    /**
     * * Get list of celebrity & take the first one as nho-si-thang-long
     */
    const personRes = await axios.get(store.api + GET_ALL_PERSON_GROUP);
    const firstPersonGroup = personRes.data.results[0];

    const personGroupId = firstPersonGroup?.id;
    if (!personGroupId) {
      console.warn("No person group found.");
      return;
    }

    /**
     * * Get nho-si-thang-long list detail
     */
    const personGroupData = await axios.get(
      store.api + GET_PERSON_GROUP_BY_ID + personGroupId + "/"
    );
    const personList = personGroupData.data.person_list;

    personStore.setPersonList(personList);
  } catch (error) {
    console.error("Unexpected error fetching markers:", error);
  }
};

export const fetchPersonAudio = async (store, audioFolerId) => {
  try {
    const audioRes = await axios.get(
      store.api + GET_AUDIO_LIST_BY_ID + audioFolerId + "/"
    );
    return audioRes.data.audio_list[0]?.translations[store.lang]?.file || ""; // assuming one file only
  } catch (audioFetchError) {
    console.error("Error fetching audio file:", audioFetchError);
  }
};

export const fetchPersonDocument = async (store, documentFolderId) => {
  try {
    const documentRes = await axios.get(
      store.api + GET_DOCUMENT_LIST_BY_ID + documentFolderId + "/"
    );
    return documentRes.data.document_list || "";
  } catch (documentFetchError) {
    console.error("Error fetching document file:", documentFetchError);
  }
};

export const fetchPersonPosition = async (store, positionFolderId) => {
  try {
    const documentRes = await axios.get(
      store.api + GET_POSITION_LIST_BY_ID + positionFolderId + "/"
    );
    return documentRes.data.position_list || "";
  } catch (documentFetchError) {
    console.error("Error fetching document file:", documentFetchError);
  }
};

export const fetchPersonImageFolder = async (store, imageFolderId) => {
  try {
    const imageRes = await axios.get(
      store.api + GET_IMAGE_LIST_BY_ID + imageFolderId + "/"
    );
    return imageRes.data.image_list || "";
  } catch (imageFetchError) {
    console.error("Error fetching document file:", imageFetchError);
  }
};
export const fetchPersonVideo = async (store, videoFolderId) => {
  try {
    const videoRes = await axios.get(
      store.api + GET_VIDEO_LIST_BY_ID + videoFolderId + "/"
    );
    return videoRes.data.video_list || "";
  } catch (videoFetchError) {
    console.error("Error fetching document file:", videoFetchError);
  }
};
export const fetchPersonTour = async (store, tourFolderId) => {
  try {
    const documentRes = await axios.get(
      store.api + GET_TOUR_LIST_BY_ID + tourFolderId + "/"
    );
    return documentRes.data.tour_list || "";
  } catch (documentFetchError) {
    console.error("Error fetching document file:", documentFetchError);
  }
};

export const fetchPersonById = async (store, personId) => {
  try {
    const personInfo = await axios.get(
      store.api + GET_PERSON_BY_ID + personId + "/"
    );
    return personInfo.data || "";
  } catch (personFetchError) {
    console.error("Error fetching person detail:", personFetchError);
  }
};
