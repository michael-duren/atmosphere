namespace Application.Presets.Instruments.DTOs;

public class SynthQueryDto
{
    public int Id { get; set; }
    public string PresetName { get; set; } = null!;

    public double Attack { get; set; }
    public double Decay { get; set; }
    public double Sustain { get; set; }
    public double Release { get; set; }
    public string Waveform { get; set; } = null!;
    public double FilterFrequency { get; set; }

    // melodic synth specific
    public double? FilterMod { get; set; }
    public string? FilterType { get; set; } = null!;
    public double? Metal { get; set; }
    public double? Chorus { get; set; }
    public string? LfoFrequency { get; set; } = null!;
    public string? LfoShape { get; set; } = null!;
}