namespace Application.Presets.Instruments.DTOs;

public class BassSynthPresetDto
{
    public int Id { get; set; }
    public string PresetName { get; set; } = null!;
    public double Attack { get; set; }
    public double Decay { get; set; }
    public double Sustain { get; set; }
    public double Release { get; set; }
    public string Waveform { get; set; } = null!;
    public double FilterFrequency { get; set; }
}