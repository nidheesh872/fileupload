import "./App.css"
import { useEffect, useState } from "react"
import { Upload } from "@aws-sdk/lib-storage"
import { S3Client, S3 } from "@aws-sdk/client-s3"

function App() {
  const [file, setFile] = useState(undefined)
  const [uploader, setUploader] = useState(undefined)

  const uploadFile = (file) => {
    console.log("Files", file)
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: "us-east-1",
          credentials: {
            accessKeyId: "AKIA3MCOFZVM2FOXNSG2",
            secretAccessKey: "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",
          },
        }),
        params: { Bucket: "nnuploadbucket", Key: file.name, Body: file },

        tags: [
          /*...*/
        ], // optional tags
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      })

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress)
      })

      parallelUploads3.done()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <h1>Upload your file</h1>
      <div>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target?.files?.[0])
            uploadFile(e.target?.files?.[0])
          }}
        />
      </div>
    </div>
  )
}

export default App
