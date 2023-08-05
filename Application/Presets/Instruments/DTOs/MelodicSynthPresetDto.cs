namespace Application.Presets.Instruments.DTOs;

public class MelodicSynthPresetDto: SynthQueryDto
{
    public new double FilterMod { get; set; }
    public new string FilterType { get; set; } = null!;
    public new double Metal { get; set; }
    public new double Chorus { get; set; }
    public new string LfoFrequency { get; set; } = null!;
    public new string LfoShape { get; set; } = null!;
}