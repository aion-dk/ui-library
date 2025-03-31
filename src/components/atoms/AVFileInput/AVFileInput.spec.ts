import { describe, it, expect } from "vitest";
import { DOMWrapper, mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import type { VitestEmitted } from "@/types";

import AVFileInput from "./AVFileInput.vue";

describe("AVFileInput", () => {
  const wrapper = mount(AVFileInput, {
    props: {
      id: "testinput",
      accept: ".json",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });
  const wrapper2 = mount(AVFileInput, {
    props: {
      id: "testinput2",
      accept: ".txt",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("#testinput").attributes().accept).to.contain(".json");
    expect(wrapper.find("#testinput").attributes().id).to.contain("testinput");
    expect(wrapper.find("[data-test=draggable-text]").text()).to.contain(
      "Drag & drop any file hereor browse file from device",
    );
    expect(wrapper.find("[data-test=accepted-formats]").text()).to.contain(
      "Accepted File Types:   .json",
    );
  });

  it("can be disabled", async () => {
    expect(wrapper.find("#testinput").attributes().disabled).to.be.undefined;
    await wrapper.setProps({ disabled: true });
    expect(wrapper.find("#testinput").attributes().disabled).toBeTruthy;
    await wrapper.setProps({ disabled: false });
    expect(wrapper.find("#testinput").attributes().disabled).to.be.undefined;
  });

  it("can manage external, downloadable files", async () => {
    expect(wrapper.text()).to.not.contain("Current version:");
    expect(wrapper.findAll("[data-test=external-values]").length).to.eq(0);

    await wrapper.setProps({
      currentValue: [
        "https://assemblyvoting.com/wp-content/uploads/av_logo.svg",
        "https://assemblyvoting.com/wp-content/uploads/Photo_2-1024x663.jpg",
        "https://assemblyvoting.com/wp-content/uploads/Photo_19-2.jpg",
      ],
    });

    expect(wrapper.text()).to.contain("Current version:");
    expect(wrapper.findAll("[data-test=external-values]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=file-download-icon]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=external-values]")[0].text()).to.eq("av_logo.svg");
    expect(wrapper.findAll("[data-test=external-values]")[1].text()).to.eq("Photo_2-1024x663.jpg");
    expect(wrapper.findAll("[data-test=external-values]")[2].text()).to.eq("Photo_19-2.jpg");

    await wrapper.setProps({
      currentValue: ["https://assemblyvoting.com/wp-content/uploads/av_logo.svg"],
    });

    expect(wrapper.findAll("[data-test=external-values]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=file-download-icon]").length).to.eq(1);
    expect(wrapper.emitted().click).to.not.exist;
    await wrapper.find("[data-test=file-download-icon]").trigger("click");
    expect(wrapper.emitted().click).to.exist;
    expect((wrapper.emitted()["download"] as VitestEmitted)[0][0]).to.eq(
      "https://assemblyvoting.com/wp-content/uploads/av_logo.svg",
    );
  });

  it("can manage external, downloadable files with preview", async () => {
    await wrapper.setProps({
      showPreview: true,
    });

    expect(wrapper.findAll("[data-test=external-values]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=file-download-icon]").length).to.eq(0);
    expect(wrapper.find("[data-test=external-values]").find("img").attributes().src).to.eq(
      "https://assemblyvoting.com/wp-content/uploads/av_logo.svg",
    );
    expect(wrapper.find("[data-test=external-values]").find("img").attributes().alt).to.eq(
      "Current image preview",
    );

    await wrapper.setProps({
      showPreview: false,
    });
  });

  it("can display errors", async () => {
    expect(wrapper.findAll("[data-test=error-msg]").length).to.eq(0);
    expect(wrapper.find("[for=testinput]").classes()).to.not.contain("error");

    await wrapper.setProps({ error: true });

    expect(wrapper.findAll("[data-test=error-msg]").length).to.eq(0);
    expect(wrapper.find("[for=testinput]").classes()).to.contain("error");

    await wrapper.setProps({ errorMessage: "Some test error" });

    expect(wrapper.find("[data-test=error-msg]").text()).to.eq("Some test error");
    expect(wrapper.find("[data-test=error-msg]").classes()).to.contain("bg-theme-danger");

    await wrapper.setProps({ error: false });

    expect(wrapper.findAll("[data-test=error-msg]").length).to.eq(0);
    expect(wrapper.find("[for=testinput]").classes()).to.not.contain("error");
  });

  it("can accept multiple files", async () => {
    expect(wrapper.find("#testinput").attributes().multiple).to.be.undefined;
    await wrapper.setProps({ multiple: true });
    expect(wrapper.find("#testinput").attributes().multiple).toBeTruthy;
    await wrapper.setProps({ multiple: false });
    expect(wrapper.find("#testinput").attributes().multiple).to.be.undefined;
  });

  it("can accept different types of files", async () => {
    expect(wrapper.find("[data-test=accepted-formats]").text()).to.contain(
      "Accepted File Types:   .json",
    );

    await wrapper.setProps({ accept: ".png,.jpg,.gif" });

    expect(wrapper.find("[data-test=accepted-formats]").text()).to.contain(
      "Accepted File Types:   .png, .jpg, .gif",
    );

    await wrapper.setProps({ disableAcceptedFormats: true });

    expect(wrapper.findAll("[data-test=accepted-formats]").length).to.eq(0);

    await wrapper.setProps({ disableAcceptedFormats: false });

    expect(wrapper.findAll("[data-test=accepted-formats]").length).to.eq(1);

    await wrapper.setProps({ accept: ".txt" });

    expect(wrapper.find("[data-test=accepted-formats]").text()).to.contain(
      "Accepted File Types:   .txt",
    );
  });

  it("can load a file", async () => {
    await wrapper.setProps({ currentValue: [] });

    expect(wrapper.emitted().update as VitestEmitted).to.be.undefined;
    expect(wrapper.text()).to.not.contain("Uploading:");
    expect(wrapper.findAll("[data-test=file-preview-icon]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=file-delete-icon]").length).to.eq(0);
    expect(wrapper.text()).to.not.contain("testfile.txt");
    expect(wrapper.text()).to.not.contain("(17b)");

    const mockFile = new File(["File text content"], "testfile.txt", {
      type: "text/plain",
    });
    const input = wrapper.find("input[type=file]") as DOMWrapper<HTMLInputElement>;

    Object.defineProperty(input.element, "files", {
      value: [mockFile],
      writable: false,
    });

    await input.trigger("change");
    await wrapper.vm.$nextTick();

    expect((wrapper.emitted().update as VitestEmitted)[0][0][0]).toEqual(mockFile);
    expect(wrapper.text()).to.contain("Uploading:");
    expect(wrapper.findAll("[data-test=file-preview-icon]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=file-delete-icon]").length).to.eq(1);
    expect(wrapper.text()).to.contain("testfile.txt");
    expect(wrapper.text()).to.contain("(17b)");
  });

  it("can remove a loaded file", async () => {
    await wrapper.find("[data-test=delete-file-button]").trigger("click");
    expect((wrapper.emitted().update as VitestEmitted)[1][0][0]).to.be.undefined;
    expect(wrapper.text()).to.not.contain("Uploading:");
    expect(wrapper.findAll("[data-test=file-preview-icon]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=file-delete-icon]").length).to.eq(0);
    expect(wrapper.text()).to.not.contain("testfile.txt");
    expect(wrapper.text()).to.not.contain("(17b)");
  });

  it("cannot drag a incorrect file", async () => {
    const imageFile = new File(["file2"], "image.png", { type: "image/png" });
    const dropzone = wrapper2.find("[data-test=dropzone]");

    expect(wrapper2.emitted().update as VitestEmitted).to.be.undefined;
    expect(wrapper2.text()).to.not.contain("Uploading:");
    expect(wrapper2.findAll("[data-test=file-preview-icon]").length).to.eq(0);
    expect(wrapper2.findAll("[data-test=file-delete-icon]").length).to.eq(0);
    expect(wrapper2.text()).to.not.contain("testfile.txt");
    expect(wrapper2.text()).to.not.contain("(17b)");

    await dropzone.trigger("drop", { files: [imageFile] });

    expect(wrapper2.emitted().update as VitestEmitted).to.be.undefined;
    expect(wrapper2.text()).to.not.contain("Uploading:");
    expect(wrapper2.findAll("[data-test=file-preview-icon]").length).to.eq(0);
    expect(wrapper2.findAll("[data-test=file-delete-icon]").length).to.eq(0);
    expect(wrapper2.text()).to.not.contain("testfile.txt");
    expect(wrapper2.text()).to.not.contain("(17b)");
  });

  it("can drag a file", async () => {
    const textFile = new File(["File text content"], "testfile.txt", {
      type: "text/plain",
    });
    const dropzone = wrapper.find("[data-test=dropzone]");

    expect((wrapper.emitted().update as VitestEmitted)[2]).to.be.undefined;
    expect(wrapper.text()).to.not.contain("Uploading:");
    expect(wrapper.findAll("[data-test=file-preview-icon]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=file-delete-icon]").length).to.eq(0);
    expect(wrapper.text()).to.not.contain("testfile.txt");
    expect(wrapper.text()).to.not.contain("(17b)");

    await dropzone.trigger("drop", { files: [textFile] });

    expect((wrapper.emitted().update as VitestEmitted)[2][0][0]).toEqual(textFile);
    expect(wrapper.text()).to.contain("Uploading:");
    expect(wrapper.findAll("[data-test=file-preview-icon]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=file-delete-icon]").length).to.eq(1);
    expect(wrapper.text()).to.contain("testfile.txt");
    expect(wrapper.text()).to.contain("(17b)");
  });

  it("can switch locale", async () => {
    expect(wrapper.text()).to.contain("Drag & drop any file hereor browse file from device");
    expect(wrapper.text()).to.contain("Accepted File Types:");
    expect(wrapper.text()).to.contain("Uploading:");
    expect(wrapper.find("[data-test=delete-file-button]").attributes()["aria-label"]).to.contain(
      "Remove",
    );

    await wrapper.setProps({
      locale: "da",
    });

    console.log(wrapper.text());
    expect(wrapper.text()).to.contain("Træk og slip en fil hereller gennemse enhed efter fil");
    expect(wrapper.text()).to.contain("Tilladte filtyper:");
    expect(wrapper.text()).to.contain("Uploader:");
    expect(wrapper.find("[data-test=delete-file-button]").attributes()["aria-label"]).to.contain(
      "Fjern",
    );
  });
});
