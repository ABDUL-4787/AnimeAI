let pyodideInstance: any = null;
let pyodidePromise: Promise<any> | null = null;

export const loadPyodide = (): Promise<any> => {
  if (pyodideInstance) return Promise.resolve(pyodideInstance);
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = new Promise((resolve, reject) => {
    // If script is already in the document, just check when loadPyodide is available
    if (document.getElementById('pyodide-cdn')) {
      checkPyodideLoaded(resolve, reject);
      return;
    }

    const script = document.createElement('script');
    script.id = 'pyodide-cdn';
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
    script.async = true;
    script.onload = () => {
      checkPyodideLoaded(resolve, reject);
    };
    script.onerror = (err) => {
      reject(new Error("Failed to load Pyodide engine from CDN. Ensure you have network access."));
    };
    document.body.appendChild(script);
  });

  return pyodidePromise;
};

const checkPyodideLoaded = (resolve: any, reject: any) => {
  let attempts = 0;
  const checkInterval = setInterval(() => {
    attempts++;
    if ((window as any).loadPyodide) {
      clearInterval(checkInterval);
      (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
      }).then((instance: any) => {
        pyodideInstance = instance;
        resolve(instance);
      }).catch((err: any) => {
        reject(err);
      });
    } else if (attempts > 100) {
      clearInterval(checkInterval);
      reject(new Error("Timeout waiting for Pyodide load function."));
    }
  }, 100);
};

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  variables: Record<string, any>;
}

export const runPythonCode = async (
  code: string,
  expectedVars: string[] = []
): Promise<ExecutionResult> => {
  try {
    const pyodide = await loadPyodide();
    
    const stdoutBuffer: string[] = [];
    const stderrBuffer: string[] = [];
    
    // Set standard output and error hooks
    pyodide.setStdout({
      write: (text: string) => {
        stdoutBuffer.push(text);
        return text.length;
      }
    });

    pyodide.setStderr({
      write: (text: string) => {
        stderrBuffer.push(text);
        return text.length;
      }
    });

    // Run the Python code
    await pyodide.runPythonAsync(code);
    
    // Extract variables requested for verification
    const variables: Record<string, any> = {};
    for (const varName of expectedVars) {
      try {
        const val = pyodide.globals.get(varName);
        if (val && typeof val === 'object' && typeof val.toJs === 'function') {
          variables[varName] = val.toJs();
          val.destroy();
        } else {
          variables[varName] = val;
        }
      } catch (e) {
        variables[varName] = undefined;
      }
    }

    return {
      success: true,
      stdout: stdoutBuffer.join(""),
      stderr: stderrBuffer.join(""),
      variables
    };
  } catch (err: any) {
    return {
      success: false,
      stdout: "",
      stderr: err.message || String(err),
      variables: {}
    };
  }
};
