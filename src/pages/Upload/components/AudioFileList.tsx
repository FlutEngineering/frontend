import { useState } from "react";
import { Artist } from "~/types";
import AudioFile from "./AudioFile";

interface AudioFileListProps {
  files: File[];
  address: Artist["address"];
  ensName: Artist["ensName"];
}

const AudioFileList: React.FC<AudioFileListProps> = ({ files, address, ensName }) => {
  const [editedItem, setEditedItem] = useState<string>(`${files[0].name}${0}`);
  return (
    <div style={{ width: "100%" }}>
      {files.map((file, index) => {
        const key = `${file.name}${index}`;
        return (
          <AudioFile
            audio={file}
            address={address}
            ensName={ensName}
            isEditing={editedItem === key}
            onClick={() => setEditedItem(key)}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default AudioFileList;
