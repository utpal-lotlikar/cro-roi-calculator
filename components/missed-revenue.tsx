"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function MissedRevenue() {
  const [averageOrderValue, setAverageOrderValue] = useState(100);
  const [conversionRate, setConversionRate] = useState(2);
  const [monthlySessions, setMonthlySessions] = useState(50000);
  const [conversionRateIncrease, setConversionRateIncrease] = useState(2.5);
  const [missedRevenue, setMissedRevenue] = useState(0);

  useEffect(() => {
    const currentRevenue =
      monthlySessions * (conversionRate / 100) * averageOrderValue;
    const potentialRevenue =
      ((monthlySessions *
        (conversionRate * (1 + conversionRateIncrease / 100))) /
        100) *
      averageOrderValue;
    setMissedRevenue(potentialRevenue - currentRevenue);
  }, [
    averageOrderValue,
    conversionRate,
    monthlySessions,
    conversionRateIncrease,
  ]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-8">
        CRO ROI Calculator
      </h1>
      <h4 className="text-center">
        Check how big of an impact a single winning A/B CRO test can have on
        your brand
      </h4>
      <div className="flex flex-col md:flex-row gap-2 p-4">
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="text-sm">You&apos;re missing out on..</div>
            <div className="text-4xl font-bold mb-2 text-green-500">
              $
              {missedRevenue.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </div>
            <div>Monthly Revenue</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="space-y-4">
            <div className="mt-2">
              <Label htmlFor="averageOrderValue">Average Order Value</Label>
              <Input
                id="averageOrderValue"
                type="number"
                min={0}
                value={averageOrderValue}
                onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
              <Input
                id="conversionRate"
                type="number"
                value={conversionRate}
                min={0}
                onChange={(e) => setConversionRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthlySessions">Monthly Sessions</Label>
              <Input
                id="monthlySessions"
                type="number"
                min={0}
                value={monthlySessions}
                onChange={(e) => setMonthlySessions(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>CRO Increase</Label>
              <ToggleGroup
                type="single"
                value={conversionRateIncrease.toString()}
                onValueChange={(value) => {
                  if (value) {
                    setConversionRateIncrease(Number(value));
                  }
                }}
              >
                <ToggleGroupItem value="2.5">2.5%</ToggleGroupItem>
                <ToggleGroupItem value="5">5%</ToggleGroupItem>
                <ToggleGroupItem value="10">10%</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
