import React, { useState } from "react";
import { Preview } from "@/components/builder/Preview";
import { SortableGrid } from "@/components/builder/SortableGrid";
import { AddField } from "@/components/builder/AddField";
import { SettingsToggle } from "@/components/builder/FormSettings/SettingsToggle";
import FormSettings from "@/components/builder/FormSettings";
import { allFieldKinds } from "formbuilder-core";
import { type BuilderContent, useAppState } from "@/state/state";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import initializeAppState from "@/hooks/initializeAppState";
import { Code } from "@/components/builder/Code";
import { FieldSettings } from "@/components/builder/FieldSettings";
import { FormList } from "@/components/builder/FormList";
import { Code2, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuilderPage() {
  const { currentForm } = useAppState();

  const [loaded, setLoaded] = useState(false);
  initializeAppState(loaded, setLoaded);

  const state = useAppState();

  const fields = allFieldKinds[state.currentForm.framework].map((v) => ({
    label: v.charAt(0).toUpperCase() + v.slice(1),
    kind: v,
  }));

  function handleTabChange(value: BuilderContent) {
    state.setAppState({
      builderContent: value,
    });
  }

  if (!loaded)
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <AiOutlineLoading3Quarters className="h-16 w-16 animate-spin text-blue-500" />
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="bg[#1D1E2B] mx-auto h-screen max-w-[1500px]">
      <div className="flex w-full justify-center pt-4">
        <FormList />
        <div
          className="max-w[1000px] b-[#1D1E2B] w-full rounded-lg"
        >
          <SettingsToggle
            onClick={() =>
              state.setAppState({
                builderContent:
                  state.builderContent === "formSettings"
                    ? null
                    : "formSettings",
              })
            }
          />
          <div className="flex justify-center bg-background">
            <div
              style={{ borderRadius: "0px 0px 10px 10px" }}
              className="flex w-fit justify-center gap-2 bg-[#1D1E2B] p-2"
            >
              <Button
                variant={
                  state.builderContent === "editor" ? "default" : "outline"
                }
                className="flex gap-2 p-3"
                onClick={() => handleTabChange("editor")}
              >
                <Pencil /> <span>Editor</span>
              </Button>
              <Button
                variant={
                  state.builderContent === "preview" ? "default" : "outline"
                }
                className="flex gap-2 p-3"
                onClick={() => handleTabChange("preview")}
              >
                <Eye /> <span>Preview</span>
              </Button>
              <Button
                variant={
                  state.builderContent === "code" ? "default" : "outline"
                }
                className="flex gap-2 p-3"
                onClick={() => handleTabChange("code")}
              >
                <Code2 /> <span>Code</span>
              </Button>
            </div>
          </div>
          <div className="bg-background p-6">
            {state.builderContent === "formSettings" ? (
              <FormSettings />
            ) : state.builderContent === "preview" ? (
              <Preview currentForm={currentForm} />
            ) : state.builderContent === "code" ? (
              <Code />
            ) : state.builderContent === "fieldSettings" ? (
              <FieldSettings />
            ) : state.builderContent === "editor" ? (
              <SortableGrid />
            ) : (
              <SortableGrid />
            )}
          </div>
        </div>
        <AddField fields={fields} />
      </div>
    </section>
  );
}