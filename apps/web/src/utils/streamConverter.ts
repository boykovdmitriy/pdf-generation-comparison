export function streamConverter(
  stream: NodeJS.ReadableStream
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      stream.on('data', (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      stream.on('end', () => controller.close());
      stream.on('error', (error: NodeJS.ErrnoException) =>
        controller.error(error)
      );
    },
  });
}
