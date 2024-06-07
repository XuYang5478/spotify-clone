"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      // upload song
      const {
        data: songData,
        error: songError
      } = await supabaseClient
        .storage.from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (songError) {
        throw songError;
      }

      // upload song
      const {
        data: imageData,
        error: imageError
      } = await supabaseClient
        .storage.from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (imageError) {
        throw imageError;
      }

      // save metadata to table
      const {
        error: supabaseError
      } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        throw supabaseError;
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error("Something went wrong: " + error);
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add song to library"
      description="Upload audio file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input id="title"
          disabled={isLoading} {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input id="author"
          disabled={isLoading} {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input id="song" type="file" accept="audio/*"
            disabled={isLoading} {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select cover image
          </div>
          <Input id="image" type="file" accept="image/*"
            disabled={isLoading} {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;