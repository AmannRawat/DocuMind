'use client'

import { useState } from 'react'
import { FileText, Loader2, UploadCloud } from 'lucide-react'


interface PdfUploadProps {
  onUploadComplete: () => void
}

export default function PdfUpload({
  onUploadComplete,
}: PdfUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      return
    }

    setError(null)

    // Make sure the selected file is a PDF
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file.')
      return
    }

    setFile(selectedFile)
    setUploading(true)

    try {
      const formData = new FormData()

      formData.append('pdf', selectedFile)

      const response = await fetch(
        'http://localhost:8001/upload/pdf',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Failed to upload PDF.')
      }

      const data = await response.json()

      if (!data.status) {
        throw new Error(data.message || 'Upload failed. Please try again.')
      }

      console.log('Upload successful:', data)

      onUploadComplete()
    } catch (error) {
      console.error('Upload error:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while uploading the PDF.'
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background/50">
      <div className="bg-card border border-border rounded-2xl shadow-sm p-10 w-full max-w-md flex flex-col items-center text-center">

        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
          {uploading ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8" />
          )}
        </div>

        <h3 className="font-semibold text-lg text-foreground mb-2">
          {file ? file.name : 'Upload your PDF'}
        </h3>

        {file && (
          <p className="text-sm text-muted-foreground mb-6">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        )}

        {!file && (
          <p className="text-sm text-muted-foreground mb-6">
            Select a PDF file to start processing.
          </p>
        )}

        <label className="w-full cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />

          <div className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors">
            {uploading ? 'Uploading...' : 'Choose PDF'}
          </div>
        </label>

        {uploading && (
          <div className="w-full mt-6">
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full w-full animate-pulse rounded-full" />
            </div>

            <p className="text-sm font-medium text-foreground mt-3">
              Uploading document...
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}