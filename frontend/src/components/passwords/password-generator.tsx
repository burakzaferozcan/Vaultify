"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { generatePassword } from "@/lib/password-generator";
import { RefreshCw } from "lucide-react";

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
}

export function PasswordGenerator({ onGenerate }: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const handleGenerate = () => {
    const password = generatePassword({
      length,
      ...options,
    });
    onGenerate(password);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Password Length: {length}</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Generate
          </Button>
        </div>
        <Slider
          value={[length]}
          onValueChange={(value) => setLength(value[0])}
          min={8}
          max={32}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="uppercase">Include Uppercase</Label>
          <Switch
            id="uppercase"
            checked={options.includeUppercase}
            onCheckedChange={(checked) =>
              setOptions((prev) => ({ ...prev, includeUppercase: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="lowercase">Include Lowercase</Label>
          <Switch
            id="lowercase"
            checked={options.includeLowercase}
            onCheckedChange={(checked) =>
              setOptions((prev) => ({ ...prev, includeLowercase: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="numbers">Include Numbers</Label>
          <Switch
            id="numbers"
            checked={options.includeNumbers}
            onCheckedChange={(checked) =>
              setOptions((prev) => ({ ...prev, includeNumbers: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="symbols">Include Symbols</Label>
          <Switch
            id="symbols"
            checked={options.includeSymbols}
            onCheckedChange={(checked) =>
              setOptions((prev) => ({ ...prev, includeSymbols: checked }))
            }
          />
        </div>
      </div>
    </div>
  );
}
